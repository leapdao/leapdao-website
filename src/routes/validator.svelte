<script>
  import Logo from "../components/Logo";
  import { onMount } from "svelte";

  async function submitGForm(form) {
    const emailEl = form.querySelector(".email");
    const userEmail = encodeURI(emailEl.value);
    const submitEl = form.querySelector(".submit");
    const origin = window.location.protocol + '//' + window.location.host;
    const alertEl = form.querySelector(".alert");


    alertEl.innerText = "Sending...";
    submitEl.setAttribute("disabled", true);

    const rsp = await fetch('https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/u/0/d/e/1FAIpQLSf_vnZHwHdDSm-YS7rKu3P7fFktBQL1U9i39mTdFNiGHZ_ULQ/formResponse', {
    method: 'POST',
    body: 'entry.2079258498=' + userEmail + '&fvv=1', // string or object
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', 
      origin,
      'x-requested-with': 'some browser'
    }
  });

    if (rsp.status === 200) {
      alertEl.innerHTML = 'Your application was send sucessfully';
    } else {
      alertEl.innerHTML = rsp.statusText;
    };
  
  console.log(rsp)
}

  let applyForm;
  onMount(() => {
    applyForm.addEventListener("submit", e => {
      e.preventDefault();
      submitGForm(e.target);
    });

    if (window.location.hash === "#subscribe") {
      window.scrollTo(
        0,
        applyForm.getBoundingClientRect().top + window.scrollY
      );
    }
  });

</script>

<style>

.col {
  font-size: 1em;
}
.images {
  width: 800px;
  padding-top: 30px
}
</style>

<div class="content">
  <header>
    <Logo />
      <p>
      An especially suited Network for dApps and decentralized projects in payments, decentralized finance, supply chains, governance or DAOs. </p>
  </header>

    <h2>The advantages of Leap plasma</h2>
    <img src="../img/advantages.jpg" alt="advantages image" class="images"/>
    <h2>Staking on Leap plasma</h2>
    <p>
       The LeapNetwork has a focus on speed & smart contract execution on layer2 while borrowing the security of 
       the Ethereum mainnet. Plasma is the scaling technology that enables these unique properties. Proof of Stake at Plasma 
       Leap is different due to the reflective token issuance: The token supply is not linear as found in other PoW or 
       PoS chains, but the issuance is reflexive and uses an indicator of the token market value 
       and adapts to the current needs of the network.
    </p>
    <h2>Advantages for Validators</h2>
      <div class="cols">
        <div class="col">
          <p>
            Through the minimized inflation of the Leap token supply, more value is retained for the owners of the Leap Token.
            The validators act in 2 roles, in addition to operating and securing the network, they are also holding 
            the majority of the tokens.
          </p>
        </div>
      <div class="col">
          <p>
            Token holders can take influence in 2 ways: <br>
            They can create proposals to the LeapDAO governance process or they can veto any on-chain modifications to 
            the Plasma bridge contract.
          </p>
        </div>
      </div>
    <h2>Roadmap</h2>
    <p> 
       Currently, the LeapNetwork (connected to Ethereum mainnet) is online, but runs with a single operator. 
       The LeapTestnet has already transitioned to multiple operators and will be used as a testbed to launch the token-staked 
       operator Plasma on the LeapNetwork in the following three steps. 
    </p>
    <img src="../img/roadmap.jpg" alt="Roadmap" class="images" style="margin-bottom: -30px;"/>
    <h2>Become a key stakeholder</h2>
    <p> 
       By participating in the early stage of the LeapNetwork PoS launch, validators have a chance to become key stakeholders
       in a network that will later require higher financial efforts to claim a similar role. The described unique properties 
       of the LeapNetwork positioned it as one of the key driving forces for real life projects and give access to various 
       use cases enabling blockchain mass-adoption.
    </p>
    <form
      bind:this={applyForm}
      id="embededLeadForm"
      action=""
      method="post"
      class="subscribe">
    <h3>Apply as a Validator</h3>
    <p style="padding-bottom: 20px;">
      We will get back to you with detailed information.
    </p>
    <label for="email" class="visually-hidden" ></label>
    <input
      id="email"
      type="email"
      value=""
      name="EMAIL"
      placeholder="Email address"
      class="email" />
    <p class="alert" />
    <button class="submit button" name="applyButton">Apply now</button>
 
     <div style="position: absolute; left: -5000px;" aria-hidden="true">
       <input
         type="text"
         name="b_6a1b0204c404c1a1c4b498537_f12a24a1f3"
         tabindex="-1"
         value="" />
     </div>

    </form>

</div>
