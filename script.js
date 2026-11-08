const bookingForm = document.getElementById("bookingForm");
const bookingResult = document.getElementById("bookingResult");
const trackButton = document.getElementById("trackButton");
const trackingResult = document.getElementById("trackingResult");

let shipments = 
JSON.parse(localStorage.getItem("shipments")) || [];

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sender = document.getElementById("senderName").value;
    const receiver = document.getElementById("receiverName").value;
    const cargo = document.getElementById("cargoType").value;
    const weight = Number(document.getElementById("weight").value);
    const shipmentType = document.getElementById("shipmentType").value;

    const trackingId = "CS" + Math.floor(100000 + Math.random() * 900000);

    let price = weight * 50;

    if (shipmentType === "Express") {
        price = price * 1.5;
    }

    const shipment = {
        trackingId: trackingId,
        sender: sender,
        receiver: receiver,
        cargo: cargo,
        weight: weight,
        price: price,
        status: "Booked"
    };

    shipments.push(shipment);
    localStorage.setItem("shipments",
    JSON.stringify(shipments));

    bookingResult.innerHTML = `
        <h3>Booking Successful!</h3>
        <p>Sender: ${sender}</p>
        <p>Receiver: ${receiver}</p>
        <p>Tracking ID: <strong>${trackingId}</strong></p>
        <p>Estimated Price: ₹${price}</p>
        <p>Please save your Tracking ID.</p>
    `;

    bookingForm.reset();
});

trackButton.addEventListener("click", function () {
    const enteredId = document.getElementById("trackingId").value.trim();

    const shipment = shipments.find(function (item) {
        return item.trackingId === enteredId;
    });

    if (shipment) {
        trackingResult.innerHTML = `
            <h3>Shipment Found</h3>
            <p>Tracking ID: ${shipment.trackingId}</p>
            <p>Sender: ${shipment.sender}</p>
            <p>Receiver: ${shipment.receiver}</p>
            <p>Status: ${shipment.status}</p>
        `;
    } else {
        trackingResult.innerHTML = `
            <p>Shipment not found. Please check your Tracking ID.</p>
        `;
    }
});
function updateShipmentStatus() {
    let trackingId = document.getElementById("adminTrackingId").value.trim();
    let newStatus = document.getElementById("newStatus").value;

    shipments = JSON.parse(localStorage.getItem("shipments")) || [];

    let shipment = shipments.find(item => item.trackingId === trackingId);

    if (shipment) {
        shipment.status = newStatus;

        localStorage.setItem("shipments", JSON.stringify(shipments));

        document.getElementById("adminResult").textContent =
            "Shipment status updated successfully!";
    } else {
        document.getElementById("adminResult").textContent =
            "Tracking ID not found!";
    }
}