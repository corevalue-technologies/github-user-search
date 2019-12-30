class Github{
    constructor(){
        this.client_id = '<CLIENDID>';
        this.client_secret = '<CLIENTSECRET>';
        this.repos_count = 100;
        this.repos_sort = 'created: asc';
        this.commit_count = 100;
        this.commit_sort = 'created: asc';
    }

    async getUser(user, repo){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
        

        return {
            profile,
            repos
        };
    }

    async getBrachOrCommit(user, repo) {
        const commitResponse = await fetch(`https://api.github.com/repos/${user}/${repo}/commits?per_page=${this.commit_count}&sort=${this.commit_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const branchResponse = await fetch(`https://api.github.com/repos/${user}/${repo}/branches?per_page=${this.commit_count}&sort=${this.commit_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const commits = await commitResponse.json();
        const branches = await branchResponse.json();

        return {
            commits,
            branches
        }
    }
}