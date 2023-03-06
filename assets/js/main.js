"use strict";
(function () {

    EventTarget.prototype.on = EventTarget.prototype.addEventListener;

    const mobileMediaQ = window.matchMedia( '(max-width: 425px)' );
    const tabletMediaQ = window.matchMedia( '(min-width: 426px) and (max-width: 768px)' );
    const desctopMediaQ = window.matchMedia( '(min-width: 769px)' );


    const pathname = window.location.pathname;


    // =======================================
    // ===          COMMON SCRIPT          ===
    // =======================================


    const sideNav = document.body.querySelector('nav.side-nav');
    const menu = document.body.querySelector('menu.primary-menu');
    const burger = document.body.querySelector('.burger');
    const container = document.body.querySelector('.container');


    const article = container.querySelector('article.article');
    const primaryNav = menu.firstElementChild;
    const primaryNavZippies = primaryNav.querySelectorAll('.zippy');


    // const menuNavsUL = menu.firstElementChild.firstElementChild;


    const articlesPreviews = container.querySelector('ul.alist');

    let previewSwitch;




    // let onScroll_UpdateTimer;
    // function onScroll_6in2() {
    //     if (!onScroll_UpdateTimer) {
    //         let counter = 0;
    //         onScroll_UpdateTimer = setInterval(() => {






    //             if (++counter == 6) { clearInterval(onScroll_UpdateTimer); onScroll_UpdateTimer = false; }
    //         },            2000 / 6);
    //     }
    // }



    // window.on('scroll', onScroll_6in2);


    // ----------------------------------------
    // Preview Mode
    // ----------------------------------------


    if (articlesPreviews) {
        if (articlesPreviews.children.length) {


            var getFocusPREVIEW = function () {

                let focusPREVIEW;
                let toFocusDistance = Infinity;

                for (let PREVIEW of articlesPreviews.children) {
                    // console.log('over PREVIEW');

                    let toCurrentDistance = Math.abs(PREVIEW.getBoundingClientRect().top);

                    if (toCurrentDistance < toFocusDistance) {
                        toFocusDistance = toCurrentDistance;
                        focusPREVIEW = PREVIEW;
                    }
                }

                // console.log(focusPREVIEW);

                return focusPREVIEW;
            }
            // window.getFocusPREVIEW = getFocusPREVIEW;





            var viewUpdate = function (focusPREVIEW, previewSwitch_STATE, onShow) {
                console.log(`viewUpdate() <- onShow: ${onShow}`);

                if (previewSwitch_STATE)
                    previewSwitch.checked = (previewSwitch_STATE === 'true')
                                            ? true : false

                // has side effect of unpredictable scrolling
                if (previewSwitch.checked)
                     articlesPreviews.classList.add('preview-mode')
                else articlesPreviews.classList.remove('preview-mode')


                if (!focusPREVIEW) return;

                // scrolling back to the Article Preview
                if(focusPREVIEW == articlesPreviews.firstElementChild)
                     document.body.scrollTo(0,0)
                else focusPREVIEW.scrollIntoView()
                    // console.log('scrolled to the Top');
                    // console.log('scrolled into focusPREVIEW');
            }



            if (document.body.dataset.layoutId == 'ALIST') {

                const category = document.body.dataset.pageCategory;

                var saveSession_previewSwitch_STATE = function(previewSwitch_STATE) {
                    sessionStorage.setItem(`previewSwitch_STATE, for: ${category}`, `${previewSwitch_STATE}`);
                }

                var fromSession_previewSwitch_STATE = function() {
                    return sessionStorage.getItem(`previewSwitch_STATE, for: ${category}`);
                }
            }




            articlesPreviews.children.indexOf = Array.prototype.indexOf;

            let focusPREVIEW_INDEX_UpdateTimer;
            var saveSession_OnSCROLL_focusPREVIEW_INDEX = function () {
                if (!focusPREVIEW_INDEX_UpdateTimer) {
                let counter = 0;
                    focusPREVIEW_INDEX_UpdateTimer = setInterval(() => {

                        sessionStorage.setItem(`focusPREVIEW_INDEX, for: ${pathname}`, articlesPreviews.children.indexOf( getFocusPREVIEW() ));

                        if (++counter == 6) { clearInterval(focusPREVIEW_INDEX_UpdateTimer); focusPREVIEW_INDEX_UpdateTimer = false; }
                    },            2000 / 6);
                }
            }

            window.on('scroll', saveSession_OnSCROLL_focusPREVIEW_INDEX);




            // let INTO_FULL;

            var saveSession_OnClick_focusPREVIEW_INDEX = function (i) {

                // nothing should be able to update focusPREVIEW_INDEX after the click
                // sessionStorage.setItem(`INTO_FULL, for: ${pathname}`, true);

                // focusPREVIEW_INDEX_UpdateTimer shouldn't be able to update focusPREVIEW_INDEX after the click
                clearInterval(focusPREVIEW_INDEX_UpdateTimer);

                sessionStorage.setItem(`focusPREVIEW_INDEX, for: ${pathname}`, i);
            }

            for (let i = 0; i < articlesPreviews.children.length; i++) {
                var link = articlesPreviews.children[i].firstElementChild.firstElementChild.firstElementChild;
                link.on('click', saveSession_OnClick_focusPREVIEW_INDEX.bind(link, i));
            }




            // var saveSession_OnPAGEHIDE_VIEW = function ()  {
            // }

            // window.on("pagehide", saveSession_OnPAGEHIDE_VIEW);








            var viewUpdateBySession_VIEW = function () {
                // let previewSwitch_STATE = sessionStorage.getItem(`previewSwitch_STATE, for: ${pathname}`);
                let previewSwitch_STATE = fromSession_previewSwitch_STATE();

                let focusPREVIEW = articlesPreviews.children[sessionStorage.getItem(`focusPREVIEW_INDEX, for: ${pathname}`)];
                viewUpdate(focusPREVIEW, previewSwitch_STATE, true);
            }

            window.on("pageshow", viewUpdateBySession_VIEW);



        } else console.log('NO Articles Previews!');
    }


    // ----------------------------------------
    // Preview Mode
    // ----------------------------------------





    // ----------------------------------------
    // Menu START
    // ----------------------------------------



    // --- Opening Menu --- //

    function openMenuOnBurgerClick(e) {
        if (!menu.classList.contains('visible'))
        {
            menu.classList.add('visible');
            burger.classList.add('hidden');

            e.opening = true;
            console.log('OnBurger - Opening Menu');
        }
    }

    function openMenuOnEscapeKeyup(e) {
        if (!menu.classList.contains('visible') && e.code == "Escape")
        {
            menu.classList.add('visible');
            burger.classList.add('hidden');

            e.opening = true;
            console.log('OnEscape - Opening Menu');
        }
    }

    burger.on('click', openMenuOnBurgerClick);
    document.on('keyup', openMenuOnEscapeKeyup);


    // --- Closing Menu --- //

    function closeMenuOfPMClick(e) {
        if (!e.opening && menu.classList.contains('visible') && !e.target.closest('menu.primary-menu'))
        {
            menu.classList.remove('visible');
            burger.classList.remove('hidden');

            console.log('off primary-menu - Closing Menu');
        }
    }

    function closeMenuOnEscapeKeyup(e) {
        if (!e.opening && menu.classList.contains('visible') && e.code == "Escape")
        {
            menu.classList.remove('visible');
            burger.classList.remove('hidden');

            console.log('OnEscape - Closing Menu');
        }
    }

    function closeMenuOnScroll() {
        if (menu.classList.contains('visible'))
        {
            menu.classList.remove('visible');
            burger.classList.remove('hidden');

            console.log('onScroll - Closing Menu');
        }
    }


    window.on('scroll', closeMenuOnScroll);
    document.documentElement.on('click', closeMenuOfPMClick);
    document.on('keyup', closeMenuOnEscapeKeyup);



    // function closeMenuOnNavClick(e) {
    //     if (menu.classList.contains('visible') && !e.target.closest('.nav a'))
    //         {
    //             menu.classList.remove('visible');
    //             burger.classList.remove('burger-on-menu');

    //             console.log("click[on nav's ul] - Closing Menu");
    //         }
    // }

    // menuNavsUL.on('click', closeMenuOnNavClick);



    // ----------------------------------------
    // Menu END
    // ----------------------------------------






    // ----------------------------------------
    // Zippy START
    // ----------------------------------------

    // let index_temp = 1;
    // document.querySelectorAll('nav.primary-nav .zippy .zippy-content').forEach( zippyContent => {
    //     zippyContent.classList.add(  `zippy-content-temp-${index_temp}`  );
    //     index_temp++;
    // });



    menu.style.display = 'block';
    document.querySelectorAll('.zippy-content').forEach( zippyContent => {
            zippyContent.classList.add(  'visible'  );
            zippyContent.offsetHeightPlus = zippyContent.offsetHeight + 25 + 43.225 + 23.275;
            zippyContent.style.cssText = `margin-top: -${zippyContent.offsetHeightPlus}px`;

    });
    menu.style.display = '';



    let zippyUnfolded;


    function zippyUnfold(e) {
        if (zippyUnfolded) return;
        console.log( 'zippyUnfold()' );


        const zippyOverflow = this.firstElementChild.nextElementSibling;
        const zippyContent = zippyOverflow.firstElementChild;

        if (zippyContent.style.marginTop != '0px') { // IF FOLDED   > UNFOLD
            zippyOverflow.style.cssText = `z-index: -1;`;

            zippyContent.style.cssText  = `transition-delay: 0.11s;
                                           margin-top: 0px;`;
        }

        zippyUnfolded = true;
    }

    function zippyFold() {
        console.log( 'zippyFold()' );
        // if (e.name == "keyup")
        //     if (e.code != "Escape") return;


        const zippyOverflow = this.firstElementChild.nextElementSibling;
        const zippyContent = zippyOverflow.firstElementChild;

        if (zippyContent.style.marginTop == '0px') { // IF UNFOLDED > FOLD
            zippyOverflow.style.cssText = `z-index: -2;`;

            zippyContent.style.cssText  = `transition-delay: 0s;
                                           margin-top: -${zippyContent.offsetHeightPlus}px;`;
        }

        const zippyHeadAnchor = this.firstElementChild.querySelector('a');
        if (zippyHeadAnchor) zippyHeadAnchor.onZippyHeadAnchorClicks = 0;

        zippyUnfolded = false;
    }


    primaryNavZippies.forEach( zippy => {
        zippy.on("mouseover", zippyUnfold);
        zippy.on("mouseleave", zippyFold);

        // zippy.on("keyup", zippyHide)
    });














    // if (article) article.on("click", zippyToggle);

    // ----------------------------------------
    // Zippy END
    // ----------------------------------------





    // ----------------------------------------
    // Side Navigation START
    // ----------------------------------------


    let sideNavRemovalTimer;

    function showSideNav() {
        if (sideNav.style.opacity == 0 && window.scrollY > 100)
            {
                clearTimeout(sideNavRemovalTimer);

                sideNav.style.cssText = `opacity: 1`;

                console.log('Scroll - Showing Side Navigation');
            }
    }

    function hideSideNav() {
        if (sideNav.style.opacity == 1 && window.scrollY <= 100)
            {
                sideNav.style.cssText = `opacity: 0`;
                sideNavRemovalTimer = setTimeout(() => {
                    sideNav.style.cssText = `opacity: 0; width: 0; height: 0`;
                }, 200);

                console.log('Scroll - Hideing Side Navigation');
            }
    }


    window.on('scroll', showSideNav);
    window.on('scroll', hideSideNav);


    // ----------------------------------------
    // Side Navigation END
    // ----------------------------------------







    function desctop_AND_tablet() {
        console.log('desctop_AND_tablet()');


            // adding listeners ..

        desctop_AND_tablet.isON = true;
        desctop_AND_tablet.off = function() {
            desctop_AND_tablet.isON = false;
            console.log('desctop_AND_tablet.off()');


            // removing listeners ..
        }
    }



    function desctop() {
        console.log('desctop()');



        // ----------------------------------------
        // Preview Mode
        // ----------------------------------------


        if (articlesPreviews) {
            if (articlesPreviews.children.length) {

                previewSwitch = document.getElementById('preview-switch-desctop');
                // console.log(`previewSwitch: ${previewSwitch}`);

                var previewModeSwitch = function () {
                    console.log('change');

                    viewUpdate( getFocusPREVIEW() );

                    saveSession_previewSwitch_STATE(previewSwitch.checked);
                }

                previewSwitch.on("change", previewModeSwitch);}

            else console.log('NO Articles Previews!');
        }


        // ----------------------------------------
        // Preview Mode
        // ----------------------------------------



        desctop.isON = true;
        desctop.off = function () {
            desctop.isON = false;
            console.log('desctop.off()');


            if (articlesPreviews) if (articlesPreviews.children.length) previewSwitch.removeEventListener("change", previewModeSwitch);
        }
    }




    function tablet() {
        console.log('tablet()');


            // adding listeners ..

        tablet.isON = true;
        tablet.off = function () {
            tablet.isON = false;
            console.log('tablet.off()');


            // removing listeners ..
        }
    }



    function mobile() {
        console.log('mobile()');


            // adding listeners ..

        mobile.isON = true;
        mobile.off = function () {
            mobile.isON = false;
            console.log('mobile.off()');


            // removing listeners ..
        }
    }


    function mobile_AND_tablet() {
        console.log('mobile_AND_tablet()');

        primaryNavZippies.forEach( zippy => {
            const zippyHeadAnchor = zippy.firstElementChild.querySelector('a');

            if (zippyHeadAnchor) {
                zippyHeadAnchor.onZippyHeadAnchorClicks = 0;
                zippyHeadAnchor.on("click", onFirstClick_noFollow);
            }
        });
        function onFirstClick_noFollow(e) { if (++this.onZippyHeadAnchorClicks == 1) e.preventDefault() }


        // if (primaryNav) primaryNav.on('click', zippyToggle);

        // ----------------------------------------
        // Preview Mode
        // ----------------------------------------


        if (articlesPreviews) {
            if (articlesPreviews.children.length) {

                previewSwitch = document.getElementById('preview-switch-mobile');
                // console.log(previewSwitch);

                var previewModeSwitch = function () {
                    console.log('change');

                    viewUpdate( getFocusPREVIEW() );

                    saveSession_previewSwitch_STATE(previewSwitch.checked);
                }

                previewSwitch.on("change", previewModeSwitch);


            } else console.log('NO Articles Previews!');
        }


        // ----------------------------------------
        // Preview Mode
        // ----------------------------------------


        mobile_AND_tablet.isON = true;
        mobile_AND_tablet.off = function() {
            mobile_AND_tablet.isON = false;
            console.log('mobile_AND_tablet.off()');

            primaryNavZippies.forEach( zippy => {
                const zippyHeadAnchor = zippy.firstElementChild.querySelector('a');
                if (zippyHeadAnchor) zippyHeadAnchor.removeEventListener("click", onFirstClick_noFollow);
            });

            if (articlesPreviews) if (articlesPreviews.children.length) previewSwitch.removeEventListener("change", previewModeSwitch);

            // if (primaryNav) primaryNav.removeEventListener('click', zippyToggle);
        }
    }









    let orientation;


    if (desctopMediaQ.matches) {
                                            desctop();
                                            desctop_AND_tablet();
        orientation = 'desctop';
    }

    desctopMediaQ.addListener( e => {
        if(e.matches && orientation != 'desctop') {

            if (mobile.isON)                mobile.off();
            if (tablet.isON)                tablet.off();
            if (mobile_AND_tablet.isON)     mobile_AND_tablet.off();

                                            desctop();
            if (!desctop_AND_tablet.isON)   desctop_AND_tablet();
            orientation = 'desctop';

            if (articlesPreviews) if (articlesPreviews.children.length) viewUpdateBySession_VIEW();
        }
    });




    if (tabletMediaQ.matches) {
                                            tablet();
                                            desctop_AND_tablet();
                                            mobile_AND_tablet();
        orientation = 'tablet';
    }

    tabletMediaQ.addListener( e => {
        if(e.matches && orientation != 'tablet') {

            if (mobile.isON)                mobile.off();
            if (desctop.isON)               desctop.off();

                                            tablet();
            if (!desctop_AND_tablet.isON)   desctop_AND_tablet();
            if (!mobile_AND_tablet.isON)    mobile_AND_tablet();
            orientation = 'tablet';

            if (articlesPreviews) if (articlesPreviews.children.length) viewUpdateBySession_VIEW();
        }
    });




    if (mobileMediaQ.matches) {
                                            mobile();
                                            mobile_AND_tablet();
        orientation = 'mobile';
    }

    mobileMediaQ.addListener( e => {
        if(e.matches && orientation != 'mobile') {

            if (tablet.isON)                tablet.off();
            if (desctop.isON)               desctop.off();
            if (desctop_AND_tablet.isON)    desctop_AND_tablet.off();

                                            mobile();
            if (!mobile_AND_tablet.isON)    mobile_AND_tablet();
            orientation = 'mobile';

            if (articlesPreviews) if (articlesPreviews.children.length) viewUpdateBySession_VIEW();
        }
    });






    // ======================================
    // ===            INNITIAL            ===
    // ======================================



    // ----------------------------------------
    // Pagination START
    // ----------------------------------------



    // document.querySelectorAll('.index-nav').forEach( (nav) => {

    //    const total_pages = {{ paginator.total_pages }};
    //    const page = {{ paginator.page }};

    //    const next_page = nav.lastElementChild;

    //    if ( page == (total_pages - 4) ) {
    //       let last_page_ELEM = document.createElement('li');
    //       last_page_ELEM.innerHTML = `<a href='{{ paginator.last_page_path | relative_url }}'>{{ paginator.last_page }}</a>`;

    //       next_page.before(last_page_ELEM);
    //    }
    //    else if ( page <= (total_pages - 5) ) {
    //       let last_page_ELEM = document.createElement('li');
    //       last_page_ELEM.innerHTML = `<span>&#8202;&#8229;&#8202;</span>
    // <a href='{{ paginator.last_page_path | relative_url }}'>{{ paginator.last_page }}</a>`;

    //       next_page.before(last_page_ELEM);

    //       last_page_ELEM.style.marginLeft = '-0.5em';
    //       // last_page.classList.add('last-page');
    //    }

    // });

    // ----------------------------------------
    // Pagination END
    // ----------------------------------------


}());
