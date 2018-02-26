import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import PropTypes from 'prop-types';
import './styles/app.css' 
// import App from './components/App'

// render(
// 	<App />,
// 	document.getElementById('root')
// )

var my_news = [
	{
		id: 1,
		author: 'Саша Летчик',
		text: 'В четверг, четвертого числа...',
		bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
	},
	{
		id: 2,
		author: 'Просто Вася',
		text: 'Считаю, что $ должен стоить 35 рублей!',
		bigText: 'А евро 42!'
	},
	{
		id: 3,
		author: 'Гость',
		text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
		bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
	}
];

class TestInput extends Component {
	render() {
		return (
			<input 
				className='test-input' 
				defaultValue = ''
				placeholder='введите значение'
				ref='myTestInput'
				onChange={(e) => { this.onBtnClickHandler(e) }} />
		)
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.myTestInput).focus();
	}

	onBtnClickHandler() {
		console.log(this.refs);
		console.log(ReactDOM.findDOMNode(this.refs.myTestInput).value);
	}
}

class Article extends Component {
	static propTypes = {
		article: PropTypes.shape({
			author: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			bigText: PropTypes.string.isRequired
		})
	}

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
	}

	readmoreClick(e) {
		e.preventDefault();
		this.setState({ visible: !this.state.visible });
	}

	render() {
		var article = this.props.article;
		return (
			<div className='news__item'>
				<p className='news__author'>{article.author}:</p>
				<p className='news__text'>{article.text}</p>
				{this.state.visible ? (
					<p className='news__big-text'>{article.bigText}</p>
				) : (
					<a href='#' 
						className='news__readmore' 
						onClick={(e) => {this.readmoreClick(e)}}>
						Подробнее
					</a>
				)
				}
			</div>
		)
	}
}

class News extends Component {
	static propTypes = {
		data: PropTypes.array.isRequired
	}

	render() {
		var data = this.props.data;
		var newsTemplate, newCounter;

		if (data.length > 0) {
			newCounter = <strong className='news__count'>Всего новостей: {data.length}</strong>;
			newsTemplate = data.map(function (item) {
				return (
					<Article article={item} key={item.id} />
				)
			})
		} else {
			newCounter = null;
			newsTemplate = <p>К сожалению новостей нет</p>
		}
		return (
			<div className='news'>
				{newsTemplate}
				{newCounter}
			</div>
		)
	}
}

class App extends Component {
	render() {
		var title = <h3>Новости</h3>;
		return (
			<div className='app'>
				{title}
				<TestInput />
				<News data={my_news} />
			</div>
		)
	}
}

render(
	<App/>,
	document.getElementById('root')
)
