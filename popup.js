/*
 * Copyright 2011 Google Inc. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var google = new OAuth2("google", {
  client_id:oauth_client_id,
  client_secret:oauth_client_secret,
  api_scope:"https://www.googleapis.com/auth/tasks"});

google.authorize(function() {
  var TASK_CREATE_URL = "https://www.googleapis.com/tasks/v1/lists/@default/tasks";
  var TASKLISTS_LIST_URL = "https://www.googleapis.com/tasks/v1/users/@me/lists";
  
  var xhr = new XMLHttpRequest;

  xhr.onreadystatechange = function(event) {
    if(xhr.readyState == 4) {
      if(xhr.status == 200) {
        var task = JSON.parse(xhr.responseText);
        console.log(task);
        document.getElementById("taskid").innerHTML = task.id;
        form.style.display = "none";
        success.style.display = "block"
      }else {
        alert("Failure!")
      }
    }
  };
  
  xhr.open("GET", TASKLISTS_LIST_URL, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "OAuth " + google.getAccessToken());
  xhr.send()
});