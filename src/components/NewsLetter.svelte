<script>
  import { onMount } from "svelte";

  function buildRequestUrl(form) {
    const action = form.getAttribute("action");
    const formData = new FormData(form);
    const url = Array.from(formData.entries()).reduce(
      (memo, [key, value]) => `${memo}&${key}=${encodeURIComponent(value)}`,
      action
    );
    return `${url}&_=${Date.now()}`;
  }

  function register2(form) {
    const alertEl = form.querySelector(".alert");
    const emailEl = form.querySelector(".email");
    const submitEl = form.querySelector(".submit");

    // jsonp
    const callbackName = `antiJQuery_${Date.now()}`;
    const url = `${buildRequestUrl(form)}&c=${callbackName}`;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.head.appendChild(script);

    alertEl.innerText = "Subscribing...";
    emailEl.setAttribute("disabled", true);
    submitEl.setAttribute("disabled", true);

    // callback for jsonp
    window[callbackName] = result => {
      try {
        if (result.result !== "success") {
          alertEl.innerHTML = result.msg;
          emailEl.removeAttribute("disabled");
          submitEl.removeAttribute("disabled");
          emailEl.style.display = "block";
          submitEl.style.display = "block";
        } else {
          alertEl.innerHTML = "Thank you!";
        }
      } catch (err) {
        alertEl.innerHTML = "Ops, there was an error.";
        emailEl.removeAttribute("disabled");
        submitEl.removeAttribute("disabled");
      }

      // cleaning up
      document.head.removeChild(script);
      window[callbackName] = undefined;
    };
  }

  let subscribeForm;
  onMount(() => {
    subscribeForm.addEventListener("submit", e => {
      e.preventDefault();
      register2(e.target);
    });

    if (window.location.hash === "#subscribe") {
      window.scrollTo(
        0,
        subscribeForm.getBoundingClientRect().top + window.scrollY
      );
    }
  });
</script>

<style>
  .flex-container {
    display: flex;
    padding: 0.5em 0em;
    width: 80%;
  }
  input {
    flex-grow: 1;
  }
</style>

<div class="content">
  <h2>Get involved!</h2>
  <p>
    Reports & Updates are random but high quality, sign up for our newsletter!
  </p>
  <form
    bind:this={subscribeForm}
    id="mc-embedded-subscribe-form"
    action="https://leapdao.us19.list-manage.com/subscribe/post-json?u=6a1b0204c404c1a1c4b498537&amp;id=f12a24a1f3&amp;c=?"
    method="post"
    class="newsletter">
    <div class="flex-container">
      <input
        id="email"
        type="email"
        value=""
        name="EMAIL"
        placeholder="Email address"
        class="email" />
      <button class="submit button">Subscribe</button>
    </div>
    <p class="alert" />

    <div style="position: absolute; left: -5000px;" aria-hidden="true">
      <input
        type="text"
        name="b_6a1b0204c404c1a1c4b498537_f12a24a1f3"
        tabindex="-1"
        value="" />
    </div>
  </form>
</div>
