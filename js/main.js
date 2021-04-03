// write code here...
const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

// Search states.json and filter it
const searchStates = async searchText =>{ // putting async since this is using fetch api which is using promises
    const res = await fetch('../data/states.json');
    const states = await res.json();

    // Get matches to the current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi'); // ^ -> it has to start with the character next to it
        // gi means, g - global, i - case insensitive
        return state.name.match(regex) || state.abbr.match(regex);
    });
        if(searchText.length === 0){
            matches = [];
            matchList.innerHTML = '';
        }

        outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) <span class ="text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
        `).join('');
        
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));