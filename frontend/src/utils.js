import Axios from 'axios';

export const flagSet = flag => {
  switch (flag) {
    case 'RU':
      return "/svg/ru.svg";
    case 'UA':
      return "/svg/ua.svg";
    case 'UK':
      return "/svg/uk.svg";
    default:
      return "/svg/err.svg";
  }
}

export const summDivis = num => {
  const strR = String(num);
  if (strR.length <= 3) {
    return strR;
  } else if (strR.length <= 6) {
    const str6 = strR.slice(0, strR.length - 3) + ' ' + strR.slice(strR.length - 3, strR.length);
    return str6;
  } else {
    const str9 = strR.slice(0, strR.length - 6) + ' ' + strR.slice(strR.length - 6, strR.length - 3) + ' ' + strR.slice(strR.length - 3, strR.length);
    return str9;
  };
}

export const currRateLoader = async () => {
  const { data } = await Axios.get('/api/configs/rate');
  if (data[0].value && data[0].useIt) {
    return data[0].value;
  } else {
    try {
      const { data } = await Axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
      return data[0].sale;
    } catch (err) { return null };
    /* try {
        const { data } = await Axios.get('https://online.oschadbank.ua/wb/api/v2/currencies/fxrates/base');
        const parsed = JSON.parse(data);
        console.log(parsed);
    } catch (err) { setCurrentRate(null) }
}; */
  };
}

export const rateLivePrivat = async () => {
  try {
    const { data } = await Axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    return data[0].sale;
  } catch (err) { return null };
}

export const dateFormat = str => {
  const d = new Date(str);
  const formStr = d.toLocaleDateString() + " " + d.getHours() + ":" + (String(d.getMinutes()).length === 2 ? d.getMinutes() : ("0" + d.getMinutes()));
  return formStr;
};

export const rusCorEndNames = (num, arrW) => {//["товаров","товар","товара"]["отзывов","отзыв","отзыва"]
  const numStr = String(num);

  const reducerF = (op, mode) => {
    if (mode === 1) {
      return arrW[0];
    } else {
      switch (op) {
        case '1':
          return arrW[1];
        case '2':
        case '3':
        case '4':
          return arrW[2];
        case '0':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          return arrW[0];
        default:
          return "error";
      }
    }
  }

  if (!numStr[1]) {
    return reducerF(numStr, 0);
  } else {
    const firstNumStr = numStr[0];
    const lastNumStr = numStr[numStr.length - 1];
    if (numStr.length < 3) {
      if (firstNumStr === '1') {
        return reducerF("x", 1);
      } else {
        return reducerF(lastNumStr, 0);
      }
    } else {
      const nearLastNumStr = numStr[numStr.length - 2];
      if (nearLastNumStr === '0') {
        return reducerF(lastNumStr, 0);
      } else if (nearLastNumStr === '1') {
        return reducerF("x", 1);
      } else {
        return reducerF(lastNumStr, 0);
      }
    }
  }
};

export const prices = [
  {
    name: 'any_Name',
    min: 0,
    max: 0,
  },
  {
    name: 'fromZeroToThreeHund_Name',
    min: 1,
    max: 11,
  },
  {
    name: 'fromThreeHundToThreeThou_Name',
    min: 11,
    max: 110,
  },
  {
    name: 'fromThreeThouToThirtyThous_Name',
    min: 110,
    max: 1098,
  },
];

export const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
];
