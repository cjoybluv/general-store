export default function({ $axios, redirect }) {
  $axios.setBaseURL(process.env.API_URL)
  // const token = localStorage.getItem('token')
  // $axios.setToken(token, 'Bearer')
  // $axios.onError((error) => {
  //   if (error.response.status === 500) {
  //     redirect('/sorry')
  //   }
  // })
}
