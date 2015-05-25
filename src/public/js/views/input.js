export default `
<span class="input">
  <input class="input__field" type="text" on-blur="blur" on-focus="focus"/>
  <label class="input__label">
    <span class="input__label-content">
      {{ placeholder }}
    </span>
  </label>
  <svg class="input__graphic" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
    <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
    <path d="M0,2.5c0,0,298.666,0,399.333,0C448.336,2.5,513.994,13,597,13c77.327,0,135-10.5,200.999-10.5c95.996,0,402.001,0,402.001,0"></path>
  </svg>
</span>
`;
