<script>
    
    import { navigate } from 'svelte-routing';
    import { gameSettings } from './stores';
    import { buttonSound } from './sound';
    import BackgroundAnimation from './BackgroundAnimation.svelte';

    let inputValue = "";
    let inputError = true;
    let textInputError = "โปรดกรอกจำนวนเต็มตั้งแต่ 2-10";

    let inputValue2 = "";
    let inputError2 = true;
    let textInputError2 = "โปรดกรอก 'จำนวนเลขที่สามารถนับได้มากสุดในแต่ละตา' ให้ถูกต้องก่อน";

    let dropdownValue = "null";
    let dropdownError = true;
    let textDropdownError = "โปรดกรอก 'จำนวนเลขที่สามารถนับได้มากสุดในแต่ละตา' ให้ถูกต้องก่อน";

    function handleInput(event, field) {
        const newValue = event.target.value;
        const sanitizedValue = newValue.replace(/[^\d]/g, '');
        if (sanitizedValue.length === 1 && sanitizedValue === "0") {
            event.target.value = ""; 
        } else {
            if (field === "inputValue") {
                inputValue = sanitizedValue;
                validateInput();
            } else if (field === "inputValue2") {
                inputValue2 = sanitizedValue;
                validateInput2();
            }
        }
    }
    
    function validateInput() {
      const intValue = parseInt(inputValue);
 
      if (isNaN(intValue) || intValue < 2 || intValue > 10 || inputValue==="") {
        inputError = true;
        textInputError = "โปรดกรอกจำนวนเต็มตั้งแต่ 2-10";

        inputValue2 = "";
        inputError2 = true;
        textInputError2 = "โปรดกรอก 'จำนวนเลขที่สามารถนับได้มากสุดในแต่ละตา' ให้ถูกต้องก่อน";

        dropdownValue = "null";
        textDropdownError = "โปรดกรอก 'จำนวนเลขที่สามารถนับได้มากสุดในแต่ละตา' ให้ถูกต้องก่อน";

        dropdownError = true
      } else {
        inputError = false;
        textInputError = "Pass";

        validateInput2()
        validateDropdown()
      }

    }
  
    function validateInput2() {
      const intValue2 = parseInt(inputValue2);
  
      if (isNaN(intValue2) || intValue2 < parseInt(inputValue) + 1 || intValue2 > 100 || inputValue2==="") {
        inputError2 = true;
        textInputError2 = `โปรดกรอกจำนวนเต็มตั้งแต่ ${parseInt(inputValue) + 1} - 100`;
      } else {
        inputError2 = false;
        textInputError2 = "Pass";
      }
    }
  
    function validateDropdown() {
      if (dropdownValue === "null"){
        dropdownError = true;
        textDropdownError = "โปรดกรอกผลของเกม"
      } else {
        dropdownError = false;
        textDropdownError = "Pass";
      }
    }

    function goToPlay() {
        buttonSound()
        if (!inputError && !inputError2 && !dropdownError) {
            gameSettings.update(settings => ({
                ...settings,
                inputValue,
                inputValue2,
                dropdownValue
            }));
            stopMusic();
            navigate('/play');
        } else {
            alert('โปรดกรอกข้อมูลให้ถูกต้องครบถ้วนก่อน');
        }
    }

    function goToRule() {
        buttonSound()
        navigate('/rule');
    }

    import { stopMusic } from './sound.js';
    
</script>

<div class="flex items-center justify-center h-screen w-screen">
    <div class="flex flex-col items-start justify-between my-5">
        <p class="text-4xl font-bold">Setting</p>
        <div class="form-control my-5">
            <label class="label"> 
            <span class="label-text {inputError ? 'text-red-500' : 'text-green-500'}">
                {textInputError}
            </span>
            </label>
            <label class="input-group">
            <span>จำนวนเลขที่สามารถนับได้มากสุดในแต่ละตา</span>
            <input
                type="text"
                class="input input-bordered {inputError ? 'border-2 border-red-500' : 'border-2 border-green-500'}"
                bind:value={inputValue}
                on:input={(event) => handleInput(event, "inputValue")}
            />
            </label>
        </div>
        <div class="form-control my-5">
            <label class="label">
            <span class="label-text {inputError2 ? 'text-red-500' : 'text-green-500'}">
                {textInputError2}
            </span>
            </label>
            <label class="input-group">
            <span>เลขสุดท้ายของเกม</span>
            <input
                type="text"
                class="input input-bordered {inputError2 ? 'border-2 border-red-500' : 'border-2 border-green-500'}"
                bind:value={inputValue2}
                on:input={(event) => handleInput(event, "inputValue2")}
                disabled={inputError===true}
            />
            </label>
        </div>
        <div class="form-control my-5">
            <label class="label">
            <span class="label-text {dropdownError ? 'text-red-500' : 'text-green-500'}">
                {textDropdownError}
            </span>
            </label>
            <label class="input-group">
            <span>เมื่อผู้เล่นนับถึงเลขสุดท้าย กำหนดให้</span>
            <select 
                class="select select-bordered" 
                bind:value={dropdownValue} 
                on:change={validateDropdown} 
                disabled={inputError===true}>
                <option value="null" disabled></option
                >
                <option value="lose">แพ้</option>
                <option value="win">ชนะ</option>
            </select>
            </label>
        </div>
        <div class="flex space-x-10 py-5">
            <button
                on:click={goToRule}
                class="rounded-full btn custom-btn w-44 text-white"
                >
                Back To Rule Page
            </button>
            <button
                on:click={goToPlay}
                class="rounded-full btn custom-btn w-44 text-white"
                >
                Let's Go!
            </button>
        </div>
    </div>
    <BackgroundAnimation
    maxNumbers={5}
    speed={30}
  />
</div>  
  