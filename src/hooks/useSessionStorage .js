import { decryptPWord } from "../functions/ChrisFunctions";

// const useSessionStorage = (name) => {
//   if (name.toLowerCase() ==='user' || name.toLowerCase() ==='variables') {
//     //  console.log('test:' , name)
//      let data2 = name ? decryptPWord (sessionStorage.getItem(name)) : "";
//     //  console.log('test1:' , data2)
//     //  console.log('test2:' , JSON.parse(data2))
//      return JSON.parse(data2)
//   } else {
//      const data = sessionStorage.getItem(name)
//      return JSON.parse(data)
//   }
// }

const useSessionStorage = (name, parse) => {
    if (parse===true) {
       //  for data json
      //  console.log('test:' , name)
       let data2 = name ? decryptPWord(sessionStorage.getItem(name)) : "";
      //  console.log('test1:' , data2)
      //  console.log('test2:' , JSON.parse(data2))
       return JSON.parse(data2)
    } else {
       let data = name ? decryptPWord(sessionStorage.getItem(name)) : "";
       return data;
    }
  }

export default useSessionStorage
