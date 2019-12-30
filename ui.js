

class UI {
    constructor(){
        this.profile = document.getElementById('firstContent');
        this.repo = document.getElementById('repos');
        this.commit = document.getElementById('commits');
        this.branch = document.getElementById('branches');
        this.repo_container =  document.getElementById('repo-container');
        this.commit_container =  document.getElementById('commit-container');
        this.branch_container =  document.getElementById('branch-container');
        this.commit_input = document.getElementById('commit-input');
        this.branch_input = document.getElementById('branch-input');
        this.commitInput = document.getElementById('commitInput');
        this.branchInput = document.getElementById('branchInput');
    }

    showProfile(user){
        this.profile.innerHTML = `
        <div  class="panel panel-primary">
        <div class="panel-heading">
            User Details
        </div>
        <div class="panel-body">
            <div class="col-lg-4" style="text-align: center;">
                <img src=${user.avatar_url} class="img-responsive" style="width: 100%; height: 428px;"/>
                <a href="https://github.com/${user.login}" target="blank" style="margin-top: 10px;">See Profle In GitHub</a>
            </div>   
            <div class="col-lg-8">
                <ul class="list-group">
                    <li class="list-group-item">
                        Name: ${user.name}
                    </li>
                    <li class="list-group-item">
                        Id: ${user.id}
                    </li>
                    <li class="list-group-item">
                        Location: ${user.location}
                    </li>
                    <li class="list-group-item">
                        Company: ${user.company}
                    </li>
                    <li class="list-group-item">
                        User Name: ${user.login}
                    </li>
                    <li class="list-group-item">
                        Public Repos: ${user.public_repos}
                    </li>                        
                    <li class="list-group-item">
                        Followers: ${user.followers}
                    </li>
                </ul>
            </div>

        </div>
        `
    }

    showRepos(repos){

        let output = '';
        let output2 = '';
        let output3 = '';

        repos.forEach((repo) => {
            output += `
                <li class="list-group-item">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <span class="badge badge-blue">Stars: ${repo.stargazers_count}</span>
                    <span class="badge badge-red">Watchers: ${repo.watchers_count}</span>
                    <span class="badge badge-green">Forks: ${repo.forks_count}</span>
                </li>
            `
            output2 += `
               <option>${repo.name}</option>
            `

            output3 += `
                <option>${repo.name}</option>
            `
        });
        this.commitInput.innerHTML = output2;
        this.branchInput.innerHTML = output3;
        this.repo_container.style.display = 'block';
        this.commit_input.style.display = 'block';
        this.branch_input.style.display = 'block';
        this.repo.innerHTML = output;
    }

    showCommit(commits){
        let output = '';
        console.log(commits);
        commits.forEach((commit) => {
            output += `
            <ul class="list-group">Commit details with Sha <b>${commit.sha}</b>    
                <li class="list-group-item"><b>Commit Message:</b> <span>"${commit.commit.message}"</span></li>
                <li class="list-group-item"><b>Commit  Url: </b><a href="${commit.html_url}" target="_blank">${commit.html_url}</a></li>
                <li class="list-group-item"><b>Commiter Name: </b>${commit.commit.author.name}</li>
                <li class="list-group-item"><b>Commited On: </b> <span>"${commit.commit.committer.date}"</span></li>
            </ul>
            `
        })

        this.commit.innerHTML = output;
        this.commit_container.style.display = 'block';
    }

    showBranch(branches){
        let output = '';
        console.log(branches)
        branches.forEach((branch) => {
            output += `
                <li class="list-group-item"><b>Branch Name: </b> <span>"${branch.name}"</span></li>
            `
        })

        this.branch.innerHTML = output;
        this.branch_container.style.display = 'block';
    }

}