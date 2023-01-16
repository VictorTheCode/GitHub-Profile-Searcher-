const form = document.querySelector("form");
const usernameInput = document.getElementById("username");
const submit = document.getElementById("submit-btn");
const userData = document.getElementById("user-data");
const repositories = document.getElementById("repos");
const text = document.getElementById("text");

form.addEventListener("submit", function (e) {

    e.preventDefault();
    
    const username = usernameInput.value;

    fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(data => {
     // console.log(data)
        userData.innerHTML = `
<div class="card p-3 float-right" style="width: 100%;">
                <div class="row">
                    <div class="col-4">
                        <img src="${data.avatar_url || "N/A"}" class="d-block w-100" alt="">
                        <a href="${data.html_url || "N/A"}" class="btn btn-primary mt-2 w-100 ml-4">View Profile</a>
                    </div>
                    <div class="col-7">
                        <div class="card-block d-flex flex-wrap justify-content-between">
                            <p class="badge rounded bg-success p-2">Repositiories: ${data.public_repos || "N/A"}</p>
                            <p class="badge rounded bg-info p-2">Public Gists: ${data.public_gists || "N/A"} </p>
                            <p class="badge rounded bg-secondary p-2">Followers: ${data.followers || "N/A"}</p>
                            <p class="badge rounded bg-primary p-2">Following: ${data.following || "N/A"}</p>
                        </div>
                        <div class="card-block">
                            <ul class="list-group">
                                <li class="list-group-item"><b>Company</b>:  ${data.company || "N/A"}</li>
                                <li class="list-group-item"><b>Blog</b>: ${data.blog || "N/A"}</li>
                                <li class="list-group-item"><b>Location</b>: ${data.location || "N/A"}</li>
                                <li class="list-group-item"><b>Member Since</b>: ${data.created_at || "N/A"}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
      `
    }) 
    .catch(err => {
        console.log(err)
    })
    
    // Display the repositories
    repositories.innerHTML = ""
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(repos => {
     // console.log(repos)
      const limitRepo = repos.slice(0, 4);
      let repoHTML = ""
      limitRepo.forEach(repo => {
        repoHTML += `
             <ul class="list-group">
                        <li class="list-group-item d-flex flex-wrap gap-3 mb-3 align-items-center ">
                            <a href="${repo.html_url}" class="col-4 col-sm-3">${repo.name}</a>
                            <span class="badge bg-primary ms-4 p-2 fw-light col-4 col-sm-2">Stars: ${repo.stargazers_count}</span>
                            <span class="badge bg-secondary ms-3 p-2 col-5 col-sm-2 fw-light">Watchers: ${repo.watchers_count}</span>
                            <span class="badge bg-success col-4 col-sm-2 ms-3 p-2 fw-light">Forks: ${repo.forks_count}</span>
                 </li>
                    </ul>
        `
      });
      repositories.innerHTML = repoHTML;
      text.style.display = "block";
    })
    .catch((err) => {
      alert("Error: Error fetching data")
    });
})