
import CONSTANT from "./constant";
import moment from "moment";
import axios from "axios";
import { Cookies } from "universal-cookie"; 
import { getCookie } from "cookies-next";

export const  makeTitle =(slug) =>{
  var words = slug.split('-');

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(' ');
}

export const convertToPlain = (html) => {
  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
};
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function capFirstLetterInSentence(sentence) {
  if (
    sentence &&
    sentence.length &&
    sentence !== undefined &&
    sentence !== null
  ) {
    let words = sentence.split(" ").map((word) => {
      return word[0]?.toUpperCase() + word.slice(1);
    });
    return words.join(" ");
  } else {
    return "";
  }
}

export const isImageExist = (ppURL) => {
  return axios.get(ppURL).then((response) => {
    return response.data;
  });
};

export const setsessionStorage = (key, jsonObj) => {
  sessionStorage.setItem(key, JSON.stringify(jsonObj));
};

export const getsessionStorage = (keyName) => {
  const item = sessionStorage.getItem(keyName);
  return JSON.parse(item);
};

export const removeStorage = (keyName) => {
  localStorage.removeItem(keyName);
};

export const setStorage = (key, jsonObj) => {
  localStorage.setItem(key, JSON.stringify(jsonObj));
};

export const getStorage = (keyName) => {
  const item = window.localStorage.getItem(keyName);
  return JSON.parse(item);
};

export const removeAllLocalStorage = () => {
  localStorage.clear();
};

export const onChange = (context, name, newValue, callback) => {
  context.setState(
    {
      [name]: { ...context.state[name], value: newValue },
    },
    callback && callback()
  );
};

export const onClear = (context, name) => {
  context.setState({
    [name]: { ...context.state[name], value: "" },
  });
};
 

export const getAuthHeader = () => {
  const token = getStorage(CONSTANT.keys.token);
  const header = {
    headers: { Authorization: "Bearer " + token },
  };
  return header;
};



export const getCandidateAuthHeader = () => {
  const token = getCookie(CONSTANT.keys.ctoken);
  const header = {
    headers: { Authorization: "Bearer " + token },
  };
  return header;
};


export const getDateParts = (input) => {
  const mDate = moment(input);
  return {
    day: mDate.format("ddd"),
    date: mDate.format("DD"),
    month: mDate.format("MM"),
    monthName: mDate.format("MMM"),
    year: mDate.format("YYYY"),
    hour: mDate.format("h"),
    minute: mDate.format("mm"),
    seconds: mDate.format("ss"),
    amOrpm: mDate.format("A"),
    relativeTime: mDate.fromNow(),
  };
};

export const getDatePartsSecond = (input) => {
  const mDate = moment(input);
  return {
    day: mDate.format("ddd"),
    date: mDate.format("DD"),
    month: mDate.format("mm"),
    monthName: mDate.format("MMM"),
    year: mDate.format("YYYY"),
    hour: mDate.format("h"),
    min: mDate.format("mm"),
    sec: mDate.format("ss"),
    amOrpm: mDate.format("A"),
    relativeTime: mDate
      .fromNow()
      .replace("min", "min")
      .replace("seconds", "sec")
      .replace("minute", "min")
      .replace("hours", "h")
      .replace("seconds", "sec")
      .replace("months", "M"),
  };
};

export const getDatePartsUnix = (input) => {
  const mDate = moment.unix(input);
  return {
    day: mDate.format("ddd"),
    date: mDate.format("DD"),
    month: mDate.format("MM"),
    monthName: mDate.format("MMM"),
    year: mDate.format("YYYY"),
    hour: mDate.format("h"),
    minute: mDate.format("mm"),
    seconds: mDate.format("ss"),
    amOrpm: mDate.format("A"),
    relativeTime: mDate.fromNow(),
  };
};

export const ToSeoUrl = (url) => {
  if (url) {
    // make the url lowercase
    var encodedUrl = url.toString().toLowerCase();

    // replace & with and
    encodedUrl = encodedUrl.split(/\&+/).join("-and-");

    // remove invalid characters
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

    // remove duplicates
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters
    encodedUrl = encodedUrl.trim("-");

    return encodedUrl;
  } else {
    return "rozgar-jobs";
  }
};

export const setOptions = (context, name, value, callback) => {
  context.setState(
    {
      [name]: { ...context.state[name], options: value },
    },
    callback && callback()
  );
};

export const clearForm = (context) => {
  const st = JSON.parse(JSON.stringify(context.state));
  let status = true;
  for (let key in st) {
    if (st.hasOwnProperty(key) && st[key]) {
      const name = st[key].name;
      onClear(context, name);
      setError(context, name, "");
    }
  }
  return status;
};

export const validateForm = (context) => {
  const st = JSON.parse(JSON.stringify(context.state));
  let status = true;
  for (let key in st) {
    if (st.hasOwnProperty(key)) {
      const isRequired = st[key] ? st[key].isRequired : false;
      if (isRequired) {
        const name = st[key].name;
        const value = st[key].value;
        const type = typeof value;
        if (
          (value === null || value === undefined || value.length === 0) &&
          type !== "number"
        ) {
          status = false;
          setError(context, name, "This Field is Required");
        } else if (value.length > 0) {
          setError(context, name, "");
        } else if (type === "number") {
          setError(context, name, "");
        }
      }
    }
  }
  return status;
};

export const validateRatingForm = (context) => {
  const st = JSON.parse(JSON.stringify(context.state));
  let status = true;
  for (let key in st) {
    if (st.hasOwnProperty(key)) {
      const isRequired = st[key] ? st[key].isRequired : false;
      if (isRequired) {
        const name = st[key].name;
        const value = st[key].value;
        const type = typeof value;
        if (
          (value === null || value === undefined || value.length === 0) &&
          type !== "number"
        ) {
          status = false;
          setError(context, name, "This Field is Required");
        } else if (value == 0 && type == "number") {
          status = false;
          setError(context, name, "This Field is Required");
        } else if (value.length > 0) {
          setError(context, name, "");
        } else if (type === "number") {
          setError(context, name, "");
        }
      }
    }
  }
  return status;
};

export function numbertoWord(input) {
  var a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  var b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return "overflow";
    let n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
        : "";
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
          (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
        : "";
    return str;
  }
  return inWords(input);
}

// export const validateForm = (context) => {
//     const st = JSON.parse(JSON.stringify(context.state));
//     let status = true;
//     for (let key in st) {
//         if (st.hasOwnProperty(key) && st[key]) {
//             const name = st[key].name;
//             const isRequired = st[key].isRequired;
//             const value = st[key].value;
//             if (isRequired && (value === null || value === undefined || value.length === 0)) {
//                 status = false;
//                 setError(context, name, 'This field is required');
//             } else if (isRequired && value.toString().length > 0) {
//                 setError(context, name, '');
//             }
//         }
//     }
//     return status;
// }

export const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  return `+${phoneNumber.slice(0, 2)}-${phoneNumber.slice(
    2,
    7
  )}-${phoneNumber.slice(6, 12)}`;
};

export const validateField = (context) => {
  const st = JSON.parse(JSON.stringify(context.state));
  let status = true;
  for (let key in st) {
    if (st.hasOwnProperty(key) && st[key]) {
      const name = st[key].name;
      const isRequired = st[key].isRequired;
      const value = st[key].value;
      if (
        isRequired &&
        (value === null || value === undefined || value.length === 0)
      ) {
        status = false;
        setError(context, name, " ");
      } else if (isRequired && value.toString().length > 0) {
        setError(context, name, "");
      }
    }
  }
  return status;
};

export const setError = (context, name, error, callback) => {
  context.setState(
    {
      [name]: { ...context.state[name], error },
    },
    callback && callback()
  );
};

export const capitalizeWords = (arr) => {
  return arr.map((element) => {
    return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  });
};

export const getRandomColorCSS = (index) => {
  const colorsCSS = [
    "bg-primary",
    "bg-warning",
    "bg-danger",
    "bg-info",
    "bg-secondary",
    "bg-primary",
    "bg-warning",
    "bg-danger",
    "bg-info",
    "bg-secondary",
    "bg-primary",
    "bg-warning",
    "bg-danger",
    "bg-info",
    "bg-secondary",
    "bg-primary",
    "bg-warning",
    "bg-danger",
    "bg-info",
    "bg-secondary",
    "bg-primary",
    "bg-warning",
    "bg-danger",
    "bg-info",
    "bg-secondary",
    "bg-primary",
    "bg-warning",
    "bg-danger",
    "bg-info",
    "bg-secondary",
  ];
  if (index !== undefined && index !== null) {
    return colorsCSS[index];
  }
  return colorsCSS[Math.floor(Math.random() * colorsCSS.length) + 1];
};

export const diff_year_month_day = (dt1, dt2) => {
  let date_1 = new Date(dt1);
  let date_2 = new Date(dt2);
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  const days = TotalDays;
  const calculateTimimg = (d) => {
    let months = 0,
      years = 0,
      days = 0,
      weeks = 0;
    while (d) {
      if (d >= 365) {
        years++;
        d -= 365;
      } else if (d >= 30) {
        months++;
        d -= 30;
      } else if (d >= 7) {
        weeks++;
        d -= 7;
      } else {
        days++;
        d--;
      }
    }
    return years + " " + "Years" + " " + months + " " + " Months";
    //    return {
    //       years, months, weeks, days
    //    };
  };
  return calculateTimimg(days);

  // console.log(TotalDays + ' days to world Cup');
  //
  // var time = (dt1.getTime() - dt2.getTime()) / 1000;
  // var year = Math.abs(Math.round((time / (60 * 60 * 24)) / 365.25));
  // var month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4)));
  // var days = Math.abs(Math.round(time / (3600 * 24)));

  // let years = Math.floor(month / 12)
  // let months = Math.floor(month % 12)
  // return years + " " + "Years" + " " + months + " " + " Months"
};

export const getRandomColorBtn = (index) => {
  const colorsCSS = [
    "btnnew",
    "btnnew-red",
    "btnnew-blue",
    "btnnew-red",
    "btnnew",
    "btnnew-blue",
    "btnnew",
    "btnnew-red",
    "btnnew-red",
    "btnnew",
    "btnnew-red",
    "btnnew-blue",
    "btnnew-red",
    "btnnew",
    "btnnew-blue",
    "btnnew",
    "btnnew-red",
    "btnnew-red",
    "btnnew",
    "btnnew-red",
    "btnnew-blue",
    "btnnew-red",
    "btnnew",
    "btnnew-blue",
    "btnnew",
    "btnnew-red",
    "btnnew-red",
    "btnnew",
    "btnnew-red",
    "btnnew-blue",
    "btnnew-red",
    "btnnew",
    "btnnew-blue",
    "btnnew",
    "btnnew-red",
    "btnnew-red",
  ];
  if (index !== undefined && index !== null) {
    return colorsCSS[index];
  }
  return colorsCSS[Math.floor(Math.random() * colorsCSS.length) + 1];
};

export function Range() {
  // 1 to 10
  const start = 97;
  const end = 122;
  const range = [...Array(end - start + 1).keys()].map((x) => x + start);
  return range;
}

// A custom function to get cookies
 
// export function getCookie(name) { 
//   if(document != undefined && document !=null){
//     let result = document.cookie.match(new RegExp(name + "=([^;]+)"));
//     if(result){
//       result = JSON.parse(JSON.stringify(result[1]))
//     };
//     return result;
//   }
// }



// A custom function to set cookies
// export function setCookie(name, value, daysToLive) {
//   if(document != undefined && document !=null){
//     let cookie = [
//       name,
//       "=",
//       JSON.stringify(value),
      
//     ].join("");
//     document.cookie = cookie;
//   }
// }


export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}



