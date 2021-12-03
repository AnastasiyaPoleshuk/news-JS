import './sources.css';
import { INewsData }  from "../news/interfaces";

interface INews{
    draw(data: INewsData []): void,
}

class Sources implements INews{

    draw(data: INewsData []) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLMetaElement = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            sourceClone.querySelector('.source__item-name').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources').append(fragment);
    }
}

export default Sources;
