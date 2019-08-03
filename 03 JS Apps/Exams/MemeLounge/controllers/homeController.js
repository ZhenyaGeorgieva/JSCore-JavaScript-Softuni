const homeController = function () {
    const getHome = async function (context) {

        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
            let response = await objectModel.getAllMemes();//САМО ПРИ ЛОГНАТИ ДА СЕ ТЪРСИ ИНФОТО
            let memes = await response.json();
            if(memes){
                for (let meme of memes) {
                    let currentMemeAuthor=meme.creator;
                    if(username===currentMemeAuthor){
                        meme.isCreator=true;
                    }else{
                        meme.isCreator=false;
                    }
                }
                context.memes = memes;
            }
            
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            memeFeed: "../views/memes/memeFeed.hbs"
        }).then(function () {
            this.partial('../views/home/homePage.hbs')
        })
    };

    return {
        getHome
    }
}();

// const getHome = async function (context) {

//     const loggedIn = storage.getData('userInfo') !== null;

//     if (loggedIn) {
//         const username = JSON.parse(storage.getData('userInfo')).username;
//         context.loggedIn = loggedIn;
//         context.username = username;
//         let response = await eventModel.getAllEvents();//САМО ПРИ ЛОГНАТИ ДА СЕ ТЪРСИ ИНФОТО
//         let events = await response.json();
//         events = events.sort((a, b) => b.peopleInterestedIn - a.peopleInterestedIn)
//         context.events = events;
//     }

//     context.loadPartials({
//         header: "../views/common/header.hbs",
//         footer: "../views/common/footer.hbs",
//         eventView: "../views/event/eventView.hbs"
//     }).then(function () {
//         this.partial('../views/home/homePage.hbs')
//     })
// };
