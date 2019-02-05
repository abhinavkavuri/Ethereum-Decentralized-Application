var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this.getCoins = _this.getCoins.bind(_this);
    _this.setIndex = _this.setIndex.bind(_this);
    _this.state = {
      coins: [],
      index: 0,
      updating: false,
      isLoading: false,
      isShowingTooltip: true };return _this;

  }_createClass(App, [{ key: 'componentDidMount', value: function componentDidMount()
    {
      this.getCoins();
      particlesJS("particles", particlesConfig);
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate(
    prevProps, prevState) {var _this2 = this;
      if (prevState.index !== this.state.index) {
        if (this.state.isShowingTooltip) {
          this.setState({ isShowingTooltip: false });
        }
        this.setState({ updating: true });
        setTimeout(function () {
          _this2.setState({ updating: false });
        }, 200);
      }
    } }, { key: 'getCoins', value: function getCoins()
    {var _this3 = this;
      this.setState({ isLoading: true });
      axios.get('https://api.coinmarketcap.com/v1/ticker/').
      then(function (res) {
        var coins = _this3.mapCoins(res.data);
        _this3.setState({ coins: coins });
        _this3.setState({ isLoading: false });
      }).
      catch(function (err) {
        console.error('Error loading data from Coin Market Cap');
        console.error(err);
      });
    } }, { key: 'getCoinIcon', value: function getCoinIcon(
    symbol) {
      return 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/' + symbol + '.svg';
    } }, { key: 'mapCoins', value: function mapCoins(
    coins) {var _this4 = this;
      return coins.map(function (coin) {return {
          name: coin.name,
          symbol: coin.symbol,
          rank: coin.rank,
          price: formatNum(coin.price_usd),
          change24hr: coin.percent_change_24h,
          cap: formatNum(coin.market_cap_usd),
          volume: formatNum(coin['24h_volume_usd']),
          circulating: formatNum(coin.available_supply),
          img: _this4.getCoinIcon(coin.symbol.toLowerCase()),
          color: getCoinColor(coin.symbol) };});

    } }, { key: 'setIndex', value: function setIndex(
    index) {
      this.setState({ index: index });
    } }, { key: 'render', value: function render()
    {var _state =






      this.state,coins = _state.coins,index = _state.index,updating = _state.updating,isLoading = _state.isLoading,isShowingTooltip = _state.isShowingTooltip;
      var card = null;
      if (isLoading) {
        card =
        React.createElement('div', { id: 'card-loading' },
          React.createElement('div', { id: 'card-loading-spinner' }));


      } else
      if (coins.length > 0) {
        card =
        React.createElement(Card, {
          coins: coins,
          index: index,
          setIndex: this.setIndex });


      }

      return (
        React.createElement('div', { id: 'app', className: updating ? 'updating' : '' },
          React.createElement('div', { id: 'particles' }),
          React.createElement('div', { id: 'help-tooltip', className: isShowingTooltip ? 'showing' : 'hide' },
            React.createElement('i', { className: 'fa fa-question-circle-o' }),
            React.createElement('h1', null, React.createElement('span', { className: 'text' }, 'Hover over the coin icon and scroll.'), React.createElement('span', { className: 'triangle' }))),

          card));


    } }]);return App;}(React.Component);var


Card = function (_React$Component2) {_inherits(Card, _React$Component2);function Card() {_classCallCheck(this, Card);return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));}_createClass(Card, [{ key: 'determineSign', value: function determineSign(
    num) {
      return parseFloat(num) >= 0 ? 'positive' : 'negative';
    } }, { key: 'render', value: function render()
    {var _props =
      this.props,coins = _props.coins,index = _props.index,
      coin = coins[index],
      colorClass = getColorClass(coin.color);
      return (
        React.createElement('div', { id: 'card-wrapper', className: colorClass },
          React.createElement('div', { id: 'card' },
            React.createElement('div', { id: 'card-left', className: 'card-half' },
              React.createElement('div', { id: 'coin-icon', style: { backgroundImage: 'url(' + coin.img + ')' } }),
              React.createElement('div', { id: 'coin-symbol-vert' },
                React.createElement('h1', null, coin.symbol)),

              React.createElement(CoinSelection, {
                coins: coins,
                index: index,
                setIndex: this.props.setIndex })),


            React.createElement('div', { id: 'card-right', className: 'card-half' },
              React.createElement('div', { id: 'card-right-contents' },
                React.createElement('div', { id: 'coin-header' },
                  React.createElement('div', { id: 'coin-name' },
                    React.createElement('h1', null, coin.name)),

                  React.createElement('div', { id: 'coin-symbol' },
                    React.createElement('h1', null, coin.symbol)),

                  React.createElement('div', { id: 'coin-rank' },
                    React.createElement('div', { className: 'label' },
                      React.createElement('h1', null, 'Rank')),

                    React.createElement('div', { className: 'value' },
                      React.createElement('h1', null, coin.rank)))),



                React.createElement('div', { id: 'coin-price' },
                  React.createElement('div', { className: 'value' },
                    React.createElement('h1', null, '$', coin.price)),

                  React.createElement('div', { id: 'coin-change-24hr', className: this.determineSign(coin.change24hr) },
                    React.createElement('h1', null, coin.change24hr, '%'))),


                React.createElement('div', { id: 'coin-info' },
                  React.createElement(CoinInfoField, { value: '$' + coin.cap, label: "Market Cap" }),
                  React.createElement(CoinInfoField, { value: '$' + coin.volume, label: "Volume" }),
                  React.createElement(CoinInfoField, { value: coin.circulating + ' ' + coin.symbol, label: "Circulating Supply" })),

                React.createElement('div', { id: 'card-right-stripes' }))))));





    } }]);return Card;}(React.Component);


var CoinInfoField = function CoinInfoField(_ref)


{var value = _ref.value,label = _ref.label;
  return (
    React.createElement('div', { className: 'coin-info-field' },
      React.createElement('div', { className: 'value' },
        React.createElement('h1', null, value)),

      React.createElement('div', { className: 'label' },
        React.createElement('h1', null, label))));



};var

CoinSelection = function (_React$Component3) {_inherits(CoinSelection, _React$Component3);
  function CoinSelection(props) {_classCallCheck(this, CoinSelection);var _this6 = _possibleConstructorReturn(this, (CoinSelection.__proto__ || Object.getPrototypeOf(CoinSelection)).call(this,
    props));
    _this6.setCurrentScrollTop = _this6.setCurrentScrollTop.bind(_this6);
    _this6.moveScrollTop = _this6.moveScrollTop.bind(_this6);
    _this6.onOptionsScroll = _this6.onOptionsScroll.bind(_this6);
    _this6.state = {
      currentScrollTop: 0 };return _this6;

  }_createClass(CoinSelection, [{ key: 'setCurrentScrollTop', value: function setCurrentScrollTop(
    val) {
      this.setState({ currentScrollTop: val });
    } }, { key: 'moveScrollTop', value: function moveScrollTop()
    {
      this.refs.coinOptions.scrollTop = this.state.currentScrollTop;
    } }, { key: 'onOptionsScroll', value: function onOptionsScroll()
    {
      var option = document.getElementsByClassName('coin-option')[0],
      topOffset = window.innerHeight / 2,
      optionHeight = option.clientHeight,
      scrollTop = this.refs.coinOptions.scrollTop,
      newScrollTop = this.props.index * (optionHeight + 20),
      index = Math.max(1, Math.ceil(scrollTop / optionHeight));
      this.setCurrentScrollTop(newScrollTop);
      this.props.setIndex(index - 1);
    } }, { key: 'render', value: function render()
    {var _this7 = this;
      var coinOptions = this.props.coins.slice(0, 10).map(function (coin) {
        var selected = _this7.props.index == coin.rank - 1;
        return (
          React.createElement('div', { key: coin.symbol, className: 'coin-option ' + (selected ? 'selected' : '') },
            React.createElement('div', { className: 'coin-option-icon', style: { backgroundImage: 'url(' + coin.img + ')' } })));


      });
      return (
        React.createElement('div', { id: 'coin-selection', onMouseLeave: this.moveScrollTop },
          React.createElement('div', { id: 'coin-options-wrapper',
              ref: 'coinOptions',
              className: 'scroll-bar',
              onScroll: _.throttle(this.onOptionsScroll, 200) },

            React.createElement('div', { id: 'coin-options' },
              coinOptions))));




    } }]);return CoinSelection;}(React.Component);


var formatNum = function formatNum(num) {
  var splitNum = num.split('.'),
  firstHalf = splitNum[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  secondHalf = splitNum[1] ? splitNum[1].substring(0, 2) : splitNum[1];

  return secondHalf ? firstHalf + '.' + secondHalf : firstHalf;
};

var getCoinColor = function getCoinColor(symbol) {
  switch (symbol) {
    case 'ETH':
    case 'XRP':
    case 'ADA':
    case 'XLM':
    case 'XEM':
    case 'LSK':
    case 'DASH':
      return BLUE;
    case 'BCH':
    case 'USDT':
    case 'NEO':
      return GREEN;
    case 'BTC':
    case 'XMR':
      return ORANGE;
    case 'TRX':
    case 'EOS':
    case 'LTC':
    default:
      return GRAY;}

};

var getColorClass = function getColorClass(color) {
  switch (color) {
    case ORANGE:
      return 'orange';
    case BLUE:
      return 'blue';
    case GREEN:
      return 'green';
    case GRAY:
      return 'gray';}

};

var ORANGE = 'ORANGE',
BLUE = 'BLUE',
GREEN = 'GREEN',
GRAY = 'GRAY';

var particlesConfig = {
  "particles": {
    "number": {
      "value": 30 },

    "color": {
      "value": "#607d8b" },

    "size": {
      "value": 2 },

    "line_linked": {
      "enable": true,
      "distance": 350,
      "color": "#607d8b" } },


  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab" },

      "onclick": {
        "enable": false } },


    "modes": {
      "grab": {
        "distance": 500,
        "line_linked": {
          "opacity": 1 } } } } };






ReactDOM.render(React.createElement(App, null), document.getElementById('root'));