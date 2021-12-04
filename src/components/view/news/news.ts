import './news.css';
import { IArticle }  from "../interfases/interfaces";
import { IView }  from "../interfases/Iview";

class News implements IView{

    draw(data: IArticle []) {
        const news: IArticle [] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone: HTMLElement = newsItemTemp.content.cloneNode(true) as HTMLElement;
            if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');

            const url = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsClone.querySelector('.news__meta-photo').setAttribute('style', `background-image:${url}` );
            newsClone.querySelector('.news__meta-author').textContent = item.author || item.name;
            newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector('.news__description-title').textContent = item.title;
            newsClone.querySelector('.news__description-source').textContent = item.name;
            newsClone.querySelector('.news__description-content').textContent = item.description;
            newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news').innerHTML = '';
        document.querySelector('.news').appendChild(fragment);
    }
}

export default News;
