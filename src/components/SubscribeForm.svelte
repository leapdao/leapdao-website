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
  .subscribe {
    position: relative;
    padding: 8rem 0 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .subscribe * {
    flex-shrink: 0;
  }

  .subscribe h3 {
    font-size: 5rem;
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1;
    margin-bottom: 1rem;
  }

  .subscribe p {
    font-size: 3rem;
    line-height: 5rem;
    margin-bottom: 3rem;
  }

  .subscribe .alert {
    font-size: 2rem;
    width: 50rem;
    max-width: 100%;
    line-height: 3rem;
    margin-top: 1rem;
    opacity: 0.5;
  }

  .subscribe :global(.alert a) {
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .subscribe :global(.button) {
    margin-top: 2rem;
  }
  .subscribe input {
    width: 60rem;
    max-width: 100%;
  }
  .visually-hidden {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
  }

  @media screen and (max-width: 900px) {
    .subscribe {
      height: auto;
      padding-top: 5rem;
      padding-bottom: 5rem;
    }

    .subscribe h3 {
      font-size: 3rem;
      line-height: 1;
      margin-bottom: 1rem;
    }

    .subscribe p {
      font-size: 2rem;
      line-height: 3rem;
      margin-bottom: 3rem;
    }

    .subscribe .alert {
      font-size: 2rem;
      line-height: 3rem;
    }

    .subscribe :global(.button) {
      margin-top: 0;
    }
  }
</style>

<form
  bind:this={subscribeForm}
  id="mc-embedded-subscribe-form"
  action="https://leapdao.us19.list-manage.com/subscribe/post-json?u=6a1b0204c404c1a1c4b498537&amp;id=f12a24a1f3&amp;c=?"
  method="post"
  class="subscribe">
  <h3>Stay in touch</h3>
  <p>
    We will notify you only about important
    <br />
    things.
  </p>
  <label for="email" class="visually-hidden">Email address</label>
  <input
    id="email"
    type="email"
    value=""
    name="EMAIL"
    placeholder="Email address"
    class="email" />
  <p class="alert" />
  <button class="submit button">Subscribe</button>

  <div style="position: absolute; left: -5000px;" aria-hidden="true">
    <input
      type="text"
      name="b_6a1b0204c404c1a1c4b498537_f12a24a1f3"
      tabindex="-1"
      value="" />
  </div>
</form>
