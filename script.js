const github = new Github;
const ui = new UI;

const button = document.getElementById('search');
const input = document.getElementById('text');
const commit = document.getElementById('commits');
const branch = document.getElementById('branches');
const commit_container =  document.getElementById('commit-container');
const branch_container =  document.getElementById('branch-container');
const repo_container =  document.getElementById('repo-container');
const div = document.getElementById('firstContent');
const commitButton = document.getElementById('commitButton');
const branchButton = document.getElementById('branchButton');
const commitInput = document.getElementById('commitInput');
const branchInput = document.getElementById('branchInput');
const commit_input = document.getElementById('commit-input');
const branch_input = document.getElementById('branch-input');
const commitContainer =  document.getElementById('commit-container');

function defaultText(){
    div.innerHTML = `<p style="text-align: center;">Just type a username and press the submit button</p>`
}

defaultText();

input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        button.click();
    }
});

commitInput.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13) {
        commitButton.click();
    }
});

branchInput.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13) {
        branchButton.click();
    }
});

button.addEventListener('click', (e) => {
    const userText = input.value;
    div.innerHTML = '<p style="text-align: center;">Searching...</p>'
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
                input.value  = '';
                defaultText();
            } else {
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
    })
       
    }else {
        alert('Please fill up the name')
        defaultText();
    }
});

commitButton.addEventListener('click', (e) => {
    const userText = input.value;
    const userText2 = commitInput.value;
    commit.innerHTML = '<p style="text-align: center;">Searching...</p>'
    commit_container.style.display = 'block'
    if(userText2 !== ''){
        github.getBrachOrCommit(userText, userText2)
        .then(data => {
            if(data.commits.message === 'Git Repository is empty.'){
                alert ('404' + ' '+ 'Git Repository is empty')
                commitInput.value = '';
            } else {
                ui.showCommit(data.commits, data.repos);
            }
            
        })
      
    } else {
        alert('Please Choose Something')
    }
});

branchButton.addEventListener('click', (e) => {
    const userText = input.value;
    const userText3 = branchInput.value;
    branch.innerHTML = '<p style="text-align: center;">Searching...</p>'
    branch_container.style.display = 'block'
    if(userText3 !== ''){
        github.getBrachOrCommit(userText, userText3)
        .then(data => {
            if(data.branches.length === 0){
                alert('Git Repository is empty.')
                branchInput.value = '';
            } else {
                ui.showBranch(data.branches);
            }
            
        })
    } 
});