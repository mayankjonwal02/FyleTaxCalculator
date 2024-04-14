document.getElementById("submit-button").addEventListener("click", function() {
    // Retrieve values from input fields
    var annualIncome = parseFloat(document.getElementById("annualincome").value);
    var extraIncome = parseFloat(document.getElementById("extraincome").value);
    var deductions = parseFloat(document.getElementById("deductions").value);
    var ageGroup = document.getElementById("agegroup").value;

    // Validate all input fields
    if (isNaN(annualIncome) || isNaN(extraIncome) || isNaN(deductions) || ageGroup === "") {
        // Display general error message if any field is empty or non-numeric
        document.getElementById("input-error").style.display = "block";
        return;
    } else {
        // Hide error message if all fields are valid
        document.getElementById("input-error").style.display = "none";
    }

    // Calculate total income
    var totalIncome = annualIncome + extraIncome - deductions;

    // Calculate tax amount based on taxable income and age group
    var taxAmount = 0;
    var taxableIncome = totalIncome - 800000; 
    if (taxableIncome > 0) {
        if (ageGroup === "<40") {
            taxAmount = 0.3 * taxableIncome;
        } else if (ageGroup === "40-59") {
            taxAmount = 0.4 * taxableIncome;
        } else if (ageGroup === "≥60") {
            taxAmount = 0.1 * taxableIncome;
        }
    }

    // Calculate overall income after tax deductions
    var overallIncome = totalIncome - taxAmount;

    // Create and display modal with overall income
    var modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <div class="bg-white" style="height: 400px; border: 2px solid rgb(192, 192, 192); display: flex; justify-content: center; align-items: center;">
                    <div style="text-align: center;">
                        <div class="fs-3 text-gray fw-bold">Your overall income will be</div>
                        <div>${overallIncome.toFixed(2)}</div>
                        <p>after tax deductions</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.appendChild(modal);

    // Show modal
    var bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
});
