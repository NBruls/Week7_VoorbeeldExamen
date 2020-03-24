// naam: 

// hint: if( ! /^\d+$/.test(ingave) )


window.addEventListener("load", handleLoad);

function handleLoad () {
	let button_start_rekenen = document.getElementById("button_start_rekenen");
	button_start_rekenen.addEventListener("click",handleClick );
}


function handleClick () {
	let ingave = document.getElementById("input_aantal").value;
	let output = document.getElementById("vermenigvuldigingen");
	if (! /^\d+$/.test(ingave)){
		output.appendChild(document.createTextNode("misse ingave voor aantal"));
	} else {
		let numberOfExercises = parseInt(ingave);
		output.appendChild(document.createElement("hr"));
		for (let i = 0; i < numberOfExercises; i++){
			let div = document.createElement("div");
			let getal1 = parseInt(`${10*Math.random()}`);
			let getal2 = parseInt(`${10*Math.random()}`);
			let input = document.createElement("input");
			input.type = "text";
			input.onkeyup = handleKeyupInput;
			div.appendChild(document.createTextNode(`${getal1} * ${getal2} = `));
			div.appendChild(input);
			output.appendChild(div);
			output.appendChild(document.createElement("hr"));
		}
	}
}

function handleKeyupInput(event){
	let target = event.target;
	let value = target.value;
	if (! /^\d+$/.test(value)) {
		target.style.color = "red";
	} else {
		target.style.color = "black";
	}
}

