export default function Index() {

let feedbackLoggedIn;
       if (
         localStorage.getItem("jwt") == null ||
         localStorage.getItem("user") == null
       ) {

         feedbackLoggedIn = <p>U moet ingelogd zijn om artwork te saven</p>;
       } else {
        console.log(localStorage.getItem("jwt"));
        console.log(localStorage.getItem("user"));
         feedbackLoggedIn = <p>U bent ingelogd</p>;
       }
  return (
    <div>
      <p id="zero-state">This is a demo for React Router.</p>
      {feedbackLoggedIn}
    </div>
  );
}
