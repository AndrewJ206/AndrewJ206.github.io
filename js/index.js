const drpdwn = document.getElementsByClassName("ditem")
const gstBut = document.getElementById("gst")
const submit = document.getElementById("send")

for (let i = 0; i < drpdwn.length; i++) {
    drpdwn[i].addEventListener("click", ()=>{
        gstBut.innerHTML = drpdwn[i].textContent
    })
}


async function sendData(formData){
    const url = 'https://script.google.com/macros/s/AKfycbwAKAy6_gaqJID7CvPXi14_w2RnmUyjXTITbJgFVYokG9O02HhFqH3_uFW2hX3VumJ7jw/exec';

    const requestOptions = {
        method: 'POST',
        body: formData
      };
    
      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Data sent successfully');
        window.location.href = "/"
      } catch (error) {
        console.error('There was a problem sending the data:', error.message);
    }
}

submit.addEventListener("click", (e)=>{    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rsvpY = document.getElementById("fyes").checked;
    const rsvpN = document.getElementById("fno").checked;
    var gstCnt = gstBut.innerText


    if (name == "" || name.length < 5) return
    if (email == "" || !email.includes("@")) return
    if (rsvpN == rsvpY) return
    if (rsvpY && gstCnt == "Number of guests") return 
    if (rsvpN) gstCnt = '0'

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('rsvp', rsvpN ? 'No' : 'Yes');
    formData.append('gcount', gstCnt);


    e.preventDefault()
    sendData(formData)
})