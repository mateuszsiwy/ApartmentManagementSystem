

document.getElementById('apartmentButton').addEventListener('click', getApartments);
document.getElementById('ownerButton').addEventListener('click', getOwners);
document.getElementById('tenantButton').addEventListener('click', getTenants);
document.getElementById('leaseButton').addEventListener('click', getLeaseAgreements);

document.getElementById('newRecordButton').addEventListener('click', showAddModal)

let current = '';
let apartmentTemplate = `
    <div class="form-group">
        <label for="recordName">Name</label>
        <input type="text" class="form-control" id="recordName" placeholder="Enter name">
    </div>
     <div class="form-group">
        <label for="recordAddress">Address</label>
        <input type="text" class="form-control" id="recordAddress" placeholder="Enter address">
    </div>
    <div class="form-group">
        <label for="recordPrice">Price</label>
        <input type="text" class="form-control" id="recordPrice" placeholder="Enter price">
    </div>
    <div class="form-group">
        <label for="recordRooms">Number of Rooms</label>
        <input type="number" class="form-control" id="recordRooms" placeholder="Enter number of rooms">
    </div>
    <div class="form-group">
        <label for="recordOwner">Owner ID</label>
        <input type="number" class="form-control" id="recordOwnerID" placeholder="Enter owner ID">
    </div>
`;

let ownerTemplate = `
    <div class="form-group">
        <label for="recordName">Name</label>
        <input type="text" class="form-control" id="recordName" placeholder="Enter name">
    </div>
     <div class="form-group">
        <label for="recordSurname">Surname</label>
        <input type="text" class="form-control" id="recordSurname" placeholder="Enter surname">
    </div>
    <div class="form-group">
        <label for="recordEmail">Email</label>
        <input type="text" class="form-control" id="recordEmail" placeholder="Enter email">
    </div>
    <div class="form-group">
        <label for="recordPhone">Phone Number</label>
        <input type="text" class="form-control" id="recordPhone" placeholder="Enter phone number">
    </div>
`;

let tenantTemplate = `
    <div class="form-group">
        <label for="recordName">Name</label>
        <input type="text" class="form-control" id="recordName" placeholder="Enter name">
    </div>
     <div class="form-group">
        <label for="recordSurname">Surname</label>
        <input type="text" class="form-control" id="recordSurname" placeholder="Enter surname">
    </div>
    <div class="form-group">
        <label for="recordEmail">Email</label>
        <input type="text" class="form-control" id="recordEmail" placeholder="Enter email">
    </div>
    <div class="form-group">
        <label for="recordStart">Start of Lease</label>
        <input type="date" class="form-control" id="recordStart" placeholder="Enter start of lease">
    </div>
`;

function getApartments() {
    current = 'apartments'
    console.log('button clicked');
    document.getElementById('header').innerHTML = 'Apartments';
    fetch('api/apartment')
        .then((res) => res.json())
        .then((data) => {
            let content = `
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Price</th>
                            <th>Number of Rooms</th>
                            <th>Owner ID</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            data.forEach(apartment => {
                content += `
                    <tr>
                        <td>${apartment.id}</td>
                        <td>${apartment.name}</td>
                        <td>${apartment.address}</td>
                        <td>${apartment.price}</td>
                        <td>${apartment.numberOfRooms}</td>
                        <td>${apartment.ownerId}</td> 
                    </tr>
                `;
                    
                    
            });
            content += `
                    </tbody>
                </table>
            `;


            document.getElementById('tableContent').innerHTML = content;
        })
}


function getOwners() {
    current = 'owners';
    console.log('Owners load');
    document.getElementById('header').innerHTML = 'Owners';
    fetch('api/owner')
        .then((res) => res.json())
        .then((data) => {
            let content = `
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            data.forEach(owner => {
                content += `
                    <tr>
                        <td>${owner.id}</td>
                        <td>${owner.name}</td>
                        <td>${owner.surname}</td>
                        <td>${owner.email}</td>
                        <td>${owner.phoneNumber}</td> 
                    </tr>
                `;


            });
            content += `
                    </tbody>
                </table>
            `;


            document.getElementById('tableContent').innerHTML = content;
        })
}


function getTenants() {
    current = 'tenants'
    console.log('Tenants load');
    document.getElementById('header').innerHTML = 'Tenants';
    fetch('api/tenant')
        .then((res) => res.json())
        .then((data) => {
            let content = `
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Start of lease</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            data.forEach(tenant => {
                content += `
                    <tr>
                        <td>${tenant.id}</td>
                        <td>${tenant.name}</td>
                        <td>${tenant.surname}</td>
                        <td>${tenant.email}</td>
                        <td>${tenant.startOfLease}</td> 
                    </tr>
                `;


            });
            content += `
                    </tbody>
                </table>
            `;


            document.getElementById('tableContent').innerHTML = content;
        })
}



function getLeaseAgreements() {
    current = 'lease';
    console.log('Lease Agreements load');
    document.getElementById('header').innerHTML = 'Lease Agreements';

    fetch('/api/leaseagreement')
        .then((res) => res.json())
        .then((data) => {
            let content = `
                <table class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Apartment ID</th>
                            <th>Tenant ID</th>
                            <th>Start of lease</th>
                            <th>End of lease</th>
                            <th>Rent</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            data.forEach(leaseagreement => {
                content += `
                    <tr>
                        <td>${leaseagreement.id}</td>
                        <td>${leaseagreement.apartmentId}</td>
                        <td>${leaseagreement.tenantId}</td>
                        <td>${leaseagreement.startOfLease}</td>
                        <td>${leaseagreement.endOfLease}</td> 
                        <td>${leaseagreement.rent}</td>
                    </tr>
                `;


            });
            content += `
                    </tbody>
                </table>
            `;


            document.getElementById('tableContent').innerHTML = content;
        })
}



function showAddModal() {
    switch (current) {
        case 'apartments':
            document.getElementById('newRecordForm').innerHTML = apartmentTemplate;
            $('#recordModal').modal('show');
            break;
        case 'owners':
            document.getElementById('newRecordForm').innerHTML = ownerTemplate;
            $('#recordModal').modal('show');
            break;
        case 'tenants':
            document.getElementById('newRecordForm').innerHTML = tenantTemplate;
            $('#recordModal').modal('show');
            break;
        default:
            console.log('switch statement failed');
    }
}