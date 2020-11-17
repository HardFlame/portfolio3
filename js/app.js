let menu = document.getElementsByClassName("menu__item");
let name = document.getElementsByClassName("name__item");
let head = document.getElementsByClassName("block__head");
let text = document.getElementsByClassName("block__text");
let button = document.getElementsByClassName("block__button");
let contacts = document.getElementsByClassName("contacts__text-item");
function lang__ru() {
   let langenable = document.getElementById("lang__ru");
   let langdisable = document.getElementById("lang__eng");
   let disableclass = langenable.getAttribute("class") ;
   let enableclass = langdisable.getAttribute("class") ;
   langenable.setAttribute("class",enableclass);
   langdisable.setAttribute("class",disableclass);
   let menuRu = ['Главная','Обо мне','Навыки','Портфолио','Контакты'];
   let nameRu = ['Денис','Новик'];
   let headRu = ['Обо мне','Навыки','Портфолио','Контакты'];
   let textRu = ["UX | UI дизайнер","24 года, Минск","Привет, меня зовут Денис - UX / UI дизайнер из Минска.","Интересуюсь дизайном и всем, что с ним связано.","Я учусь на курсах \"Веб и мобильный дизайн\".","в IT-Академии.", "Готов реализовывать отличные проекты","с замечательными людьми.","Я работаю в таких программах как","Интернет-магазин модной одежды - Главная","Магазин Reebok - Концепт","Лендинг Braun - Концепт","Хотите узнать больше или просто поболтать?","Добро пожаловать!"];
   let buttonRu = ["Написать мне"];
   let contactsRu = ["Поставьте мне лайк","LinkedIn, Instagram, Behance, Dribble"];
   translate(menu,menuRu);
   translate(name,nameRu);
   translate(head,headRu);
   translate(text,textRu);
   translate(button,buttonRu);
   translate(contacts,contactsRu);
}
function lang__eng() {
   let langenable = document.getElementById("lang__eng");
   let langdisable = document.getElementById("lang__ru");
   let disableclass = langenable.getAttribute("class") ;
   let enableclass = langdisable.getAttribute("class") ;
   langenable.setAttribute("class",enableclass);
   langdisable.setAttribute("class",disableclass);
   let menuEng = ['Home','About me','Skills','Portfolio','Contacts'];
   let nameEng = ['Denis','Novik'];
   let headEng = ['About me','Skills','Portfolio','Contacts'];
   let textEng = ["UX | UI designer","24 years old, Minsk","Hi, I\'m Denis – UX/UI designer from Minsk. ","I\'m interested in design and everything connected with it.","I\'m studying at courses \"Web and mobile design ","interfaces\" in IT-Academy.", "Ready to implement excellent projects ","with wonderful people.","I work in such programs as","Online fashion store - Homepage","Reebok Store - Concept","Braun Landing Page - Concept","Want to know more or just chat?","You are welcome!"];
   let buttonEng = ["Send message"];
   let contactsEng = ["Like me on","LinkedIn, Instagram, Behance, Dribble"];
   translate(menu,menuEng);
   translate(name,nameEng);
   translate(head,headEng);
   translate(text,textEng);
   translate(button,buttonEng);
   translate(contacts,contactsEng);
}
function translate(classEl , arrayLang) {
   for (let i = 0; i < classEl.length; i++) {
      classEl[i].innerHTML = arrayLang[i];
   }
}
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());