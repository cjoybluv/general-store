export default function({ $axios, redirect }) {
  $axios.setBaseURL(process.env.API_URL)
  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
