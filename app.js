import {initializeApp} from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  connectAuthEmulator,
  getIdToken,
} from "firebase/auth"

main()

async function main () {
  const el = {
    sectionSignin: document.querySelector('#sectionSignin'),
    sectionUser: document.querySelector('#sectionUser'),
    sectionSignout: document.querySelector('#sectionSignout'),

    inputEmail: document.querySelector('#inputEmail'),
    inputPassword: document.querySelector('#inputPassword'),

    buttonSignin: document.querySelector('#buttonSignin'),
    buttonSignup: document.querySelector('#buttonSignup'),
    buttonSignout: document.querySelector('#buttonSignout'),

    errorMessage: document.querySelector('#errorMessage'),
    uid: document.querySelector('#uid'),
  }

  const response = await fetch('firebase-config.json') // <1>
  const firebaseConfig = await response.json()
  const app = initializeApp(firebaseConfig) // <2>
  const auth = getAuth(app) // <3>
  connectAuthEmulator(auth, "http://localhost:9099");
//   auth.initializeApp({ projectId: "demo-unchain-portal"})
  
  onAuthStateChanged(auth, (user) => { // <4>
    if (user) {
      el.sectionSignin.style.display = 'none'
      el.sectionUser.style.display = 'block'
      el.sectionSignout.style.display = 'block'
      el.uid.innerHTML = user.uid
    } else {
      el.sectionSignin.style.display = 'block'
      el.sectionUser.style.display = 'none'
      el.sectionSignout.style.display = 'none'
    }
  })

  el.buttonSignin.addEventListener('click', async (event) => { // <5>
    try {
      event.preventDefault()

      const email = el.inputEmail.value
      const password = el.inputPassword.value
      await signInWithEmailAndPassword(auth, email, password)
	  auth.currentUser.getIdToken().then(function(idtoken) {
		console.log(idtoken)
	  })
    } catch (err) {
      el.errorMessage.innerHTML = err.message
      console.error(err)
    }
  })

  el.buttonSignup.addEventListener('click', async (event) => { // <6>
    try {
      event.preventDefault()

      const email = el.inputEmail.value
      const password = el.inputPassword.value
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      el.errorMessage.innerHTML = err.message
      console.error(err)
    }
  })

  el.buttonSignout.addEventListener('click', async (event) => { // <7>
    try {
      event.preventDefault()
      await signOut(auth)
    } catch (err) {
      console.error(err)
    }
  })
}
