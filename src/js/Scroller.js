class Scroller {
    constructor() {
        this.sections = document.querySelectorAll('section');

        this.drawNavigation();
    }

    drawNavigation = () => {
        this.navigationContainer = document.createElement('aside');
        this.navigationContainer.setAttribute('class', 'scroller-navigation');
        const list = document.createElement('ul');

        this.sections.forEach((section) => {
            const listItem = document.createElement('li');

            listItem.addEventListener('click', function () {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                const liElements = list.querySelectorAll('li');
                liElements.forEach(element => {
                    element.setAttribute('class', 'non-active');
                });
                listItem.setAttribute('class', 'active');
            });

            list.appendChild(listItem);
        });

        this.navigationContainer.appendChild(list);

        document.body.appendChild(this.navigationContainer);
    };
}

export default Scroller;