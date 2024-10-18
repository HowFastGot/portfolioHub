export default class Customizator {
    constructor() {
        this.btnsBlock = document.createElement("div");
        this.colorBtn = document.createElement("input");
        this.scale = localStorage.getItem("scale") ?? 1;
        this.color = localStorage.getItem("color") ?? "#ffffff";
        this.reset = document.createElement("div");

        this.btnsBlock.addEventListener("click", (e) => this.onScaleChange(e));
        this.colorBtn.addEventListener("input", (e) => this.onColorChange(e));
        this.reset.addEventListener("click", (e) => this.clear());
    }

    onScaleChange(e) {

        if (e) {
            this.scale = parseInt(e.target.value);
        }

        const recurcy = (elem) => {
            elem.childNodes.forEach( (child) => {

                if (child.parentElement.getAttribute("data-font")) {
                    child.parentElement.style.fontSize = child.parentElement.getAttribute("data-font") * this.scale + "px";
                } else {

                    if (child.nodeName === "#text" && child.textContent.replace(/\s+/g, "").length > 0) {
                        let fontSize = parseInt(window.getComputedStyle(child.parentElement, null).fontSize);
                        
                        child.parentElement.setAttribute("data-font", fontSize);
                        child.parentElement.style.fontSize = child.parentElement.getAttribute("data-font") * this.scale + "px";
                    } else {
                        recurcy(child);
                    }

                }
            });
        };

        recurcy(document.body);

        localStorage.setItem("scale", this.scale);
    }

    onColorChange(e) {
        document.body.style.backgroundColor = e.target.value;
        localStorage.setItem("color", e.target.value);
    }

    setBgColor() {
        document.body.style.backgroundColor = this.color;
    }

    clear() {
        localStorage.clear();
        this.scale = 1;
        this.color = "#ffffff";
        this.onScaleChange();
        this.setBgColor();
    }

    insertStyle() {
        let style = document.createElement("style");

        style.innerHTML = `
            .panel {
                z-index: 20;
                display: flex;
                justify-content: space-around;
                align-items: center;
                position: fixed;
                top: 10px;
                right: 0;
                border: 1px solid rgba(0, 0, 0, .2);
                box-shadow: 0 0 20px rgba(0, 0, 0, .5);
                width: 300px;
                height: 60px;
                background-color: #fff;
            
            }
            
            .scale {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 200px;
                height: 40px;
                flex-wrap: nowrap;
            }

            .scale_btn {
                display: block;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(0, 0, 0, .2);
                border-radius: 4px;
                font-size: 18px;
                cursor: pointer;
            }
            .color {
                width: 40px;
                height: 40px;
            }

            .clear {
                font-size: 30px!important;
                text-align: center;
                cursor: pointer;
            }
        `;

        document.querySelector("head").append(style);
    }

    render() {
        this.onScaleChange();
        this.setBgColor();
        this.insertStyle();

        this.customBlock = document.createElement("div");

        let fontBtnS =  document.createElement("input"),
            fontBtnM =  document.createElement("input");
        
        this.btnsBlock.classList.add("scale");
        this.btnsBlock.append(fontBtnS, fontBtnM);

        for (let i = 0; i < this.btnsBlock.children.length; i++) {

            this.btnsBlock.children[i].value = `${i + 1}x`;
            this.btnsBlock.children[i].classList.add("scale_btn");
            this.btnsBlock.children[i].setAttribute("type", "button");
        }

        this.reset.setAttribute("type", "button");
        this.reset.classList.add("clear");
        this.reset.innerHTML = "&times";

        this.colorBtn.setAttribute("type", "color");
        this.colorBtn.setAttribute("value", "#ffffff");

        this.customBlock.classList.add("panel");
        this.customBlock.append(this.btnsBlock, this.colorBtn, this.reset);

        document.querySelector("body").prepend(this.customBlock);
    }
}