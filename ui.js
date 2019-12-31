

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
        this.commitSelect = document.getElementById('commitSelect');
        this.branchSelect = document.getElementById('branchSelect');
    }

    showProfile(user){
        this.profile.innerHTML = `
        <div  class="panel panel-primary">
        <div class="panel-heading">
            User Details
        </div>
        <div class="panel-body">
            <div class="col-lg-4 text-center">
                <img src=${user.avatar_url} class="img-responsive user-image"/>
                <a href="https://github.com/${user.login}" target="blank" class="marginT10">See Profle In GitHub</a>
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
        document.getElementsByClassName('content')[0].scrollTop = document.getElementsByClassName('data-container')[0].offsetTop - 100
    }

    showRepos(repos){
        if (repos.length > 0) {
            let list = '';
            let repoName = '';

            repos.forEach((repo) => {
                list += `
                    <li class="list-group-item flex justifySpace alignCenter">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        <div class=""badges>
                            <span class="badge badge-blue">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-red">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-green">Forks: ${repo.forks_count}</span>
                        </div>
                    </li>
                `
                repoName += `
                <option>${repo.name}</option>
                `
            });
            this.commitSelect.innerHTML = repoName;
            this.branchSelect.innerHTML = repoName;
            this.repo_container.style.display = 'block';
            this.commit_input.style.display = 'block';
            this.branch_input.style.display = 'block';
            this.repo.innerHTML = list;
        } else {
            this.repo_container.style.display = 'block';
            this.repo.innerHTML = '<p class="text-center">No repositories found.</p>'
        }
    }

    showCommit(commits){
        let output = '';
        commits.forEach((commit) => {
            output += `
            <ul class="list-group">    
                <li class="list-group-item"><b>Commit Message:</b> <span>"${commit.commit.message}"</span></li>
                <li class="list-group-item"><b>Commit  Url: </b><a href="${commit.html_url}" target="_blank">${commit.html_url}</a></li>
                <li class="list-group-item"><b>Commiter Name: </b>${commit.commit.author.name}</li>
                <li class="list-group-item"><b>Commited On: </b> <span>"${commit.commit.committer.date}"</span></li>
            </ul>
            `
        })

        this.commit.innerHTML = output;
        this.commit_container.style.display = 'block';
        document.getElementsByClassName('content')[0].scrollTop = document.getElementById('commit-container').offsetTop - 100
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
        document.getElementsByClassName('content')[0].scrollTop = document.getElementById('branch-container').offsetTop - 100
    }

}