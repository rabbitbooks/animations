const slider = document.querySelector('.page-scroll')
const $page = $('.page__wrapper')
const asideNavi = document.querySelectorAll('.side-navi li')
const pages = document.querySelectorAll('.page-scroll section')

const findActiveSlide = () => {
	let slideNum;
	pages.forEach((item, index) => {
		if (item.classList.contains('page-slide--is-active')) {
			slideNum = index
		}
	})
	return slideNum
}

const setPageHeight = (clientHeight) => {
	pages.forEach(index => {
		index.style.height = clientHeight + 'px'
	})
}

let clientHeight = document.documentElement.clientHeight
setPageHeight(clientHeight)

window.onresize = () => {
	clientHeight = document.documentElement.clientHeight
	slider.style.transform = 'translateY('+ -(clientHeight * (findActiveSlide()) + 1) +'px)'
	setPageHeight(clientHeight)
	slider.style.transition = 'none';
}

let isAnimationComplite = true
const changeSlide = (activeSlide, targetSlide) => {
	if (activeSlide == targetSlide || !isAnimationComplite) return
	const direction = activeSlide < targetSlide ? 'up' : 'down'
	const pagesCount = pages.length - 1

	if ( (activeSlide == pagesCount && direction == 'up') || (activeSlide == 0 && direction == 'down')) return
	isAnimationComplite = false

	slider.style.transition = 'transform ease 1s';

	pages[activeSlide].classList.remove('page-slide--is-active')
	pages[targetSlide].classList.add('page-slide--is-active')
	asideNavi[activeSlide].classList.remove('side-nav__item--is-active')
	asideNavi[targetSlide].classList.add('side-nav__item--is-active')

	let transitionStep = (direction == 'down') ? -(clientHeight * findActiveSlide() ) : -(clientHeight * findActiveSlide() )
	slider.style.transform = 'translateY('+ transitionStep +'px)'

	setTimeout(() => {
		isAnimationComplite = true
	}, 0)
}

asideNavi.forEach((item, index) => {
	item.onclick = () => {
		changeSlide(findActiveSlide(), index)
	}
})

$page.mousewheel((e) => {
	e.preventDefault()
	let activeSlide = findActiveSlide()
	if (e.deltaY < 0) {
		changeSlide(activeSlide, ++activeSlide)
	} else {
		changeSlide(activeSlide, --activeSlide)
	}
})