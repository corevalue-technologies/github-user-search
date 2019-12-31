const github = new Github;
const ui = new UI;

const searchButton = document.getElementById('search');
const searchText = document.getElementById('text');
const commit = document.getElementById('commits');
const branch = document.getElementById('branches');
const commit_container =  document.getElementById('commit-container');
const branch_container =  document.getElementById('branch-container');
const repo_container =  document.getElementById('repo-container');
const div = document.getElementById('firstContent');
const commitButton = document.getElementById('commitButton');
const branchButton = document.getElementById('branchButton');
const commitSelect = document.getElementById('commitSelect');
const branchSelect = document.getElementById('branchSelect');
const commit_input = document.getElementById('commit-input');
const branch_input = document.getElementById('branch-input');
const commitContainer =  document.getElementById('commit-container');

function defaultText(){
    div.innerHTML = `<p class="text-center">Just type a username and press the submit button</p>`
}

defaultText();

searchText.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        searchButton.click();
    }
});

commitSelect.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13) {
        commitButton.click();
    }
});

branchSelect.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13) {
        branchButton.click();
    }
});

searchButton.addEventListener('click', (e) => {
    const userText = searchText.value;
    div.innerHTML = '<p class="text-center">Searching...</p>'
    commit_container.style.display = 'none'
    commit_input.style.display = 'none'
    branch_input.style.display = 'none'
    branch_container.style.display = 'none'
    repo_container.style.display = 'none'
    if(userText !== ''){
        github.getUser(userText)
        .then(data => {
            if(data.profile.message === 'Not Found'){
                alert('404'+ ' ' + data.profile.message);
                searchText.value  = '';
                defaultText();
            } else {
                ui.showProfile(data.profile);
                github.getRepos(userText)
                .then(repos => {
                  ui.showRepos(repos.repos); 
                })
            }
        })
    } else {
        alert('Please fill up the name')
        defaultText();
    }
});

commitButton.addEventListener('click', (e) => {
    const userText = searchText.value;
    const userText2 = commitSelect.value;
    commit.innerHTML = '<p class="text-center">Searching...</p>'
    commit_container.style.display = 'block'
    if(userText2 !== ''){
        github.getBrachOrCommit(userText, userText2)
        .then(data => {
            if(data.commits.message === 'Git Repository is empty.'){
                alert ('404' + ' '+ 'Git Repository is empty')
                commitSelect.value = '';
            } else {
                ui.showCommit(data.commits, data.repos);
            }
        })
      
    } else {
        alert('Please Choose Something')
    }
});

branchButton.addEventListener('click', (e) => {
    const userText = searchText.value;
    const userText3 = branchSelect.value;
    branch.innerHTML = '<p class="text-center">Searching...</p>'
    branch_container.style.display = 'block'
    if(userText3 !== ''){
        github.getBrachOrCommit(userText, userText3)
        .then(data => {
            if(data.branches.length === 0){
                alert('Git Repository is empty.')
                branchSelect.value = '';
            } else {
                ui.showBranch(data.branches);
            }
        })
    } 
});