"use strict";
(() => {
  // <stdin>
  {
    let openMenuOnBurgerClick = function(e) {
      if (!menu.classList.contains("visible")) {
        menu.classList.add("visible");
        burger.classList.add("hidden");
        e.opening = true;
        console.log("OnBurger - Opening Menu");
      }
    }, openMenuOnEscapeKeyup = function(e) {
      if (!menu.classList.contains("visible") && e.code == "Escape") {
        menu.classList.add("visible");
        burger.classList.add("hidden");
        e.opening = true;
        console.log("OnEscape - Opening Menu");
      }
    }, closeMenuOfPMClick = function(e) {
      if (!e.opening && menu.classList.contains("visible") && !e.target.closest("nav.primary-nav")) {
        menu.classList.remove("visible");
        burger.classList.remove("hidden");
        console.log("off primary-menu - Closing Menu");
      }
    }, closeMenuOnEscapeKeyup = function(e) {
      if (!e.opening && menu.classList.contains("visible") && e.code == "Escape") {
        menu.classList.remove("visible");
        burger.classList.remove("hidden");
        console.log("OnEscape - Closing Menu");
      }
    }, closeMenuOnScroll = function() {
      if (menu.classList.contains("visible")) {
        menu.classList.remove("visible");
        burger.classList.remove("hidden");
        console.log("onScroll - Closing Menu");
      }
    }, zippyUnfold = function(e) {
      console.log("zippyUnfold()");
      const zippyOverflow = this.firstElementChild.nextElementSibling;
      if (zippyOverflow) {
        const zippyContent = zippyOverflow.firstElementChild;
        if (zippyContent.style.marginTop != "0px") {
          zippyContent.style.cssText = `margin-top: 0px;`;
        }
      }
    }, zippyFold = function() {
      console.log("zippyFold()");
      const zippyOverflow = this.firstElementChild.nextElementSibling;
      if (zippyOverflow) {
        const zippyContent = zippyOverflow.firstElementChild;
        if (zippyContent.style.marginTop == "0px") {
          zippyContent.style.cssText = `margin-top: -${zippyContent.offsetHeightPlus}px;`;
        }
      }
      const zippyHeadAnchor = this.firstElementChild.querySelector("a");
      if (zippyHeadAnchor) zippyHeadAnchor.onZippyHeadAnchorClicks = 0;
    }, showSideNav = function() {
      if (sideNav.style.opacity == 0 && window.scrollY > 100) {
        clearTimeout(sideNavRemovalTimer);
        sideNav.style.cssText = `opacity: 1`;
        console.log("Scroll - Showing Side Navigation");
      }
    }, hideSideNav = function() {
      if (sideNav.style.opacity == 1 && window.scrollY <= 100) {
        sideNav.style.cssText = `opacity: 0`;
        sideNavRemovalTimer = setTimeout(() => {
          sideNav.style.cssText = `opacity: 0; width: 0; height: 0`;
        }, 200);
        console.log("Scroll - Hideing Side Navigation");
      }
    }, desctop_AND_tablet = function() {
      console.log("desctop_AND_tablet()");
      desctop_AND_tablet.isON = true;
      desctop_AND_tablet.off = function() {
        desctop_AND_tablet.isON = false;
        console.log("desctop_AND_tablet.off()");
      };
    }, desctop = function() {
      console.log("desctop()");
      if (articlesPreviews) {
        if (articlesPreviews.children.length) {
          previewSwitch = document.getElementById("preview-switch-desctop");
          var previewModeSwitch = function() {
            console.log("change");
            viewUpdate(getFocusPREVIEW());
            saveSession_previewSwitch_STATE(previewSwitch.checked);
          };
          previewSwitch.on("change", previewModeSwitch);
        } else console.log("NO Articles Previews!");
      }
      desctop.isON = true;
      desctop.off = function() {
        desctop.isON = false;
        console.log("desctop.off()");
        if (articlesPreviews) {
          if (articlesPreviews.children.length) previewSwitch.removeEventListener("change", previewModeSwitch);
        }
      };
    }, tablet = function() {
      console.log("tablet()");
      tablet.isON = true;
      tablet.off = function() {
        tablet.isON = false;
        console.log("tablet.off()");
      };
    }, mobile = function() {
      console.log("mobile()");
      mobile.isON = true;
      mobile.off = function() {
        mobile.isON = false;
        console.log("mobile.off()");
      };
    }, mobile_AND_tablet = function() {
      console.log("mobile_AND_tablet()");
      if (articlesPreviews) {
        if (articlesPreviews.children.length) {
          previewSwitch = document.getElementById("preview-switch-mobile");
          var previewModeSwitch = function() {
            console.log("change");
            viewUpdate(getFocusPREVIEW());
            saveSession_previewSwitch_STATE(previewSwitch.checked);
          };
          previewSwitch.on("change", previewModeSwitch);
        } else console.log("NO Articles Previews!");
      }
      mobile_AND_tablet.isON = true;
      mobile_AND_tablet.off = function() {
        mobile_AND_tablet.isON = false;
        console.log("mobile_AND_tablet.off()");
        primaryNavZippies.forEach((zippy) => {
          const zippyHeadAnchor = zippy.firstElementChild.querySelector("a");
          if (zippyHeadAnchor) zippyHeadAnchor.removeEventListener("click", onFirstClick_noFollow);
        });
        if (articlesPreviews) {
          if (articlesPreviews.children.length) previewSwitch.removeEventListener("change", previewModeSwitch);
        }
      };
    };
    if (navigator.userAgent.includes("Chrome") && !navigator.userAgent.includes("Edge")) {
      document.documentElement.classList.add("chrome");
    }
    let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    if (scrollbarWidth > 0) {
      document.documentElement.classList.add("has-scrollbar");
    } else {
      document.documentElement.classList.add("no-scrollbar");
    }
    window.mobileAndTabletCheck = function() {
      let check = false;
      (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };
    EventTarget.prototype.on = EventTarget.prototype.addEventListener;
    const mobileMediaQ = window.matchMedia("(max-width: 425px)");
    const tabletMediaQ = window.matchMedia("(min-width: 426px) and (max-width: 768px)");
    const desctopMediaQ = window.matchMedia("(min-width: 769px)");
    const pathname = window.location.pathname;
    const sideNav = document.body.querySelector(".side-nav");
    const menu = document.body.querySelector(".primary-nav");
    const burger = document.body.querySelector(".burger");
    const container = document.body.querySelector(".container");
    const article = container.querySelector("article.article");
    const primaryNav = document.body.querySelector(".primary-nav");
    const primaryNavZippies = primaryNav.querySelectorAll(".zippy");
    const articlesPreviews = container.querySelector("ul.alist");
    let previewSwitch;
    if (articlesPreviews) {
      if (articlesPreviews.children.length) {
        getFocusPREVIEW = function() {
          let focusPREVIEW;
          let distance_to_focus = Infinity;
          for (let PREVIEW of articlesPreviews.children) {
            let distance_to_current = Math.abs(PREVIEW.getBoundingClientRect().top);
            if (distance_to_current < distance_to_focus) {
              distance_to_focus = distance_to_current;
              focusPREVIEW = PREVIEW;
            }
          }
          return focusPREVIEW;
        };
        viewUpdate = function(focusPREVIEW, previewSwitch_STATE, onShow) {
          console.log(`viewUpdate() <- onShow: ${onShow}`);
          if (previewSwitch_STATE)
            previewSwitch.checked = previewSwitch_STATE === "true" ? true : false;
          if (previewSwitch.checked)
            articlesPreviews.classList.add("preview-mode");
          else articlesPreviews.classList.remove("preview-mode");
          if (!focusPREVIEW) return;
          if (focusPREVIEW == articlesPreviews.firstElementChild)
            document.body.scrollTo(0, 0);
          else focusPREVIEW.scrollIntoView();
        };
        if (articlesPreviews) {
          if (articlesPreviews.children.length) {
            const category = document.body.dataset.pageCategory;
            saveSession_previewSwitch_STATE = function(previewSwitch_STATE) {
              sessionStorage.setItem(`previewSwitch_STATE, for: ${category}`, `${previewSwitch_STATE}`);
            };
            fromSession_previewSwitch_STATE = function() {
              return sessionStorage.getItem(`previewSwitch_STATE, for: ${category}`);
            };
          }
        }
        articlesPreviews.children.indexOf = Array.prototype.indexOf;
        let focusPREVIEW_INDEX_UpdateTimer;
        saveSession_OnSCROLL_focusPREVIEW_INDEX = function() {
          if (!focusPREVIEW_INDEX_UpdateTimer) {
            let counter = 0;
            focusPREVIEW_INDEX_UpdateTimer = setInterval(() => {
              sessionStorage.setItem(`focusPREVIEW_INDEX, for: ${pathname}`, articlesPreviews.children.indexOf(getFocusPREVIEW()));
              if (++counter == 6) {
                clearInterval(focusPREVIEW_INDEX_UpdateTimer);
                focusPREVIEW_INDEX_UpdateTimer = false;
              }
            }, 2e3 / 6);
          }
        };
        window.on("scroll", saveSession_OnSCROLL_focusPREVIEW_INDEX);
        saveSession_OnClick_focusPREVIEW_INDEX = function(i) {
          clearInterval(focusPREVIEW_INDEX_UpdateTimer);
          sessionStorage.setItem(`focusPREVIEW_INDEX, for: ${pathname}`, i);
        };
        for (let i = 0; i < articlesPreviews.children.length; i++) {
          link = articlesPreviews.children[i].firstElementChild.firstElementChild.firstElementChild;
          link.on("click", saveSession_OnClick_focusPREVIEW_INDEX.bind(link, i));
        }
        viewUpdateBySession_VIEW = function() {
          let previewSwitch_STATE = fromSession_previewSwitch_STATE();
          let focusPREVIEW = articlesPreviews.children[sessionStorage.getItem(`focusPREVIEW_INDEX, for: ${pathname}`)];
          viewUpdate(focusPREVIEW, previewSwitch_STATE, true);
        };
        window.on("pageshow", viewUpdateBySession_VIEW);
      } else console.log("NO Articles Previews!");
    }
    burger.on("click", openMenuOnBurgerClick);
    document.on("keyup", openMenuOnEscapeKeyup);
    window.on("scroll", closeMenuOnScroll);
    document.documentElement.on("click", closeMenuOfPMClick);
    document.on("keyup", closeMenuOnEscapeKeyup);
    menu.style.display = "block";
    document.querySelectorAll(".zippy-content").forEach((zippyContent) => {
      zippyContent.offsetHeightPlus = zippyContent.offsetHeight + 25 + 43.225 + 23.275;
      zippyContent.style.cssText = `margin-top: -${zippyContent.offsetHeightPlus}px`;
    });
    menu.style.display = "";
    primaryNavZippies.forEach((zippy) => {
      zippy.on("mouseover", zippyUnfold);
      zippy.on("mouseleave", zippyFold);
    });
    let sideNavRemovalTimer;
    window.on("scroll", showSideNav);
    window.on("scroll", hideSideNav);
    if (mobileAndTabletCheck()) {
      let onFirstClick_noFollow2 = function(e) {
        if (++this.onZippyHeadAnchorClicks == 1) e.preventDefault();
      };
      console.log("MOBILE DEVICE");
      primaryNavZippies.forEach((zippy) => {
        const zippyHeadAnchor = zippy.firstElementChild.querySelector("a");
        if (zippyHeadAnchor) {
          zippyHeadAnchor.onZippyHeadAnchorClicks = 0;
          zippyHeadAnchor.on("click", onFirstClick_noFollow2);
        }
      });
    }
    let orientation;
    if (desctopMediaQ.matches) {
      desctop();
      desctop_AND_tablet();
      orientation = "desctop";
    }
    desctopMediaQ.addListener((e) => {
      if (e.matches && orientation != "desctop") {
        if (mobile.isON) mobile.off();
        if (tablet.isON) tablet.off();
        if (mobile_AND_tablet.isON) mobile_AND_tablet.off();
        desctop();
        if (!desctop_AND_tablet.isON) desctop_AND_tablet();
        orientation = "desctop";
        if (articlesPreviews) {
          if (articlesPreviews.children.length) viewUpdateBySession_VIEW();
        }
      }
    });
    if (tabletMediaQ.matches) {
      tablet();
      desctop_AND_tablet();
      mobile_AND_tablet();
      orientation = "tablet";
    }
    tabletMediaQ.addListener((e) => {
      if (e.matches && orientation != "tablet") {
        if (mobile.isON) mobile.off();
        if (desctop.isON) desctop.off();
        tablet();
        if (!desctop_AND_tablet.isON) desctop_AND_tablet();
        if (!mobile_AND_tablet.isON) mobile_AND_tablet();
        orientation = "tablet";
        if (articlesPreviews) {
          if (articlesPreviews.children.length) viewUpdateBySession_VIEW();
        }
      }
    });
    if (mobileMediaQ.matches) {
      mobile();
      mobile_AND_tablet();
      orientation = "mobile";
    }
    mobileMediaQ.addListener((e) => {
      if (e.matches && orientation != "mobile") {
        if (tablet.isON) tablet.off();
        if (desctop.isON) desctop.off();
        if (desctop_AND_tablet.isON) desctop_AND_tablet.off();
        mobile();
        if (!mobile_AND_tablet.isON) mobile_AND_tablet();
        orientation = "mobile";
        if (articlesPreviews) {
          if (articlesPreviews.children.length) viewUpdateBySession_VIEW();
        }
      }
    });
  }
  var getFocusPREVIEW;
  var viewUpdate;
  var saveSession_previewSwitch_STATE;
  var fromSession_previewSwitch_STATE;
  var saveSession_OnSCROLL_focusPREVIEW_INDEX;
  var saveSession_OnClick_focusPREVIEW_INDEX;
  var link;
  var viewUpdateBySession_VIEW;
})();
