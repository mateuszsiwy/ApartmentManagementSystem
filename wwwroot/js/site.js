

document.getElementById('apartmentButton').addEventListener('click', getApartments);
document.getElementById('ownerButton').addEventListener('click', getOwners);
document.getElementById('tenantButton').addEventListener('click', getTenants);
document.getElementById('leaseButton').addEventListener('click', getLeaseAgreements);

document.getElementById('newRecordButton').addEventListener('click', showAddModal);
document.getElementById('submitNewRecord').addEventListener('click', submitNewRecord);

document.getElementById('closeButtonEdit').addEventListener('click', () =>
{
    document.getElementById('errorMessage').style.display = 'none';
    $('#recordModal').modal('hide');
})
document.getElementById('closeButtonDelete').addEventListener('click', () => {
    document.getElementById('errorMessage').style.display = 'none';
    $('#deleteModal').modal('hide');
})

document.getElementById('confirmDelete').addEventListener('click', deletionConfirmed);

let current = '';
let action = '';
let currentId;

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

let leaseTemplate = `
    <div class="form-group">
        <label for="recordApartmentId">Apartment ID</label>
        <input type="number" class="form-control" id="recordApartmentId" placeholder="Enter apartment ID">
    </div>
     <div class="form-group">
        <label for="recordTenantId">Tenant ID</label>
        <input type="number" class="form-control" id="recordTenantId" placeholder="Enter tenant ID">
    </div>
    <div class="form-group">
        <label for="recordStart">Start of Lease</label>
        <input type="date" class="form-control" id="recordStart" placeholder="Enter start of lease">
    </div>
    <div class="form-group">
        <label for="recordEnd">End of Lease</label>
        <input type="date" class="form-control" id="recordEnd" placeholder="Enter end of lease">
    </div>
    <div class="form-group">
        <label for="recordRent">Rent</label>
        <input type="text" class="form-control" id="recordRent" placeholder="Enter rent">
    </div>
`;

function getApartments() {
    current = 'apartment'
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
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editRecord(${apartment.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteRecord(${apartment.id})">Delete</button>
                        </td>
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
    current = 'owner';
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
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editRecord(${owner.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteRecord(${owner.id})">Delete</button>
                        </td>
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
    current = 'tenant'
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
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editRecord(${tenant.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteRecord(${tenant.id})">Delete</button>
                        </td>
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
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editRecord(${leaseagreement.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteRecord(${leaseagreement.id})">Delete</button>
                        </td>
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

function checkAction() {

}

function showAddModal() {
    action = 'add';
    switch (current) {
        case 'apartment':
            document.getElementById('newRecordForm').innerHTML = apartmentTemplate;
            $('#recordModal').modal('show');
            break;
        case 'owner':
            document.getElementById('newRecordForm').innerHTML = ownerTemplate;
            $('#recordModal').modal('show');
            break;
        case 'tenant':
            document.getElementById('newRecordForm').innerHTML = tenantTemplate;
            $('#recordModal').modal('show');
            break
        case 'lease':
            document.getElementById('newRecordForm').innerHTML = leaseTemplate;
            $('#recordModal').modal('show');
            break;
        default:
            console.log('switch statement failed');
    }
}

function submitNewRecord() {
    console.log('submit button clicked');
    let newRecord;

    const errorMessageContainer = document.getElementById('errorMessage');

    errorMessageContainer.style.display = 'none';

    if (action === 'add') {
        switch (current) {
            case 'apartment':
                const apartmentName = document.getElementById('recordName').value;
                const apartmentAddress = document.getElementById('recordAddress').value;
                const apartmentPrice = document.getElementById('recordPrice').value;
                const apartmentRooms = document.getElementById('recordRooms').value;
                const apartmentOwnerId = document.getElementById('recordOwnerID').value;

                newRecord = {
                    name: apartmentName,
                    address: apartmentAddress,
                    price: apartmentPrice,
                    numberOfRooms: apartmentRooms,
                    ownerId: apartmentOwnerId
                };
                break;
            case 'owner':
                const ownerName = document.getElementById('recordName').value;
                const ownerSurname = document.getElementById('recordSurname').value;
                const ownerEmail = document.getElementById('recordEmail').value;
                const ownerPhone = document.getElementById('recordPhone').value;

                newRecord = {
                    name: ownerName,
                    surname: ownerSurname,
                    email: ownerEmail,
                    phoneNumber: ownerPhone
                };
                break;
            case 'tenant':
                const tenantName = document.getElementById('recordName').value;
                const tenantSurname = document.getElementById('recordSurname').value;
                const tenantEmail = document.getElementById('recordEmail').value;
                const tenantStartOfLease = document.getElementById('recordStart').value;

                newRecord = {
                    name: tenantName,
                    surname: tenantSurname,
                    email: tenantEmail,
                    startOfLease: tenantStartOfLease
                };
                break;
            case 'lease':
                const leaseApartmentId = document.getElementById('recordApartmentId').value;
                const leaseTenantId = document.getElementById('recordTenantId').value;
                const leaseStart = document.getElementById('recordStart').value;
                const leaseEnd = document.getElementById('recordEnd').value;
                const leaseRent = document.getElementById('recordRent').value;

                newRecord = {
                    apartmentId: leaseApartmentId,
                    tenantId: leaseTenantId,
                    startOfLease: leaseStart,
                    endOfLease: leaseEnd,
                    rent: leaseRent
                };
                break;
            default:
                console.log('switch statement failed');
                return;
        }

        fetch(`/api/${current}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecord)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Record added successfully');
                    $('#recordModal').modal('hide');
                    switch (current) {
                        case 'apartment':
                            getApartments();
                            break;
                        case 'owner':
                            getOwners();
                            break;
                        case 'tenant':
                            getTenants();
                            break;
                        case 'lease':
                            getLeaseAgreements();
                            break;
                    }
                } else {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error adding record');
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessageContainer.innerHTML = error.message;
                errorMessageContainer.style.display = 'block';
            });
    } else {
        let newRecord;
        switch (current) {
            case 'apartment':
                const apartmentName = document.getElementById('recordName').value;
                const apartmentAddress = document.getElementById('recordAddress').value;
                const apartmentPrice = document.getElementById('recordPrice').value;
                const apartmentRooms = document.getElementById('recordRooms').value;
                const apartmentOwnerId = document.getElementById('recordOwnerID').value;

                newRecord = {
                    id: currentId,
                    name: apartmentName,
                    address: apartmentAddress,
                    price: apartmentPrice,
                    numberOfRooms: apartmentRooms,
                    ownerId: apartmentOwnerId
                };
                break;
            case 'owner':
                const ownerName = document.getElementById('recordName').value;
                const ownerSurname = document.getElementById('recordSurname').value;
                const ownerEmail = document.getElementById('recordEmail').value;
                const ownerPhone = document.getElementById('recordPhone').value;

                newRecord = {
                    id: currentId,
                    name: ownerName,
                    surname: ownerSurname,
                    email: ownerEmail,
                    phoneNumber: ownerPhone
                };
                break;
            case 'tenant':
                const tenantName = document.getElementById('recordName').value;
                const tenantSurname = document.getElementById('recordSurname').value;
                const tenantEmail = document.getElementById('recordEmail').value;
                const tenantStartOfLease = document.getElementById('recordStart').value;

                newRecord = {
                    id: currentId,
                    name: tenantName,
                    surname: tenantSurname,
                    email: tenantEmail,
                    startOfLease: tenantStartOfLease
                };
                break;
            case 'lease':
                const leaseApartmentId = document.getElementById('recordApartmentId').value;
                const leaseTenantId = document.getElementById('recordTenantId').value;
                const leaseStart = document.getElementById('recordStart').value;
                const leaseEnd = document.getElementById('recordEnd').value;
                const leaseRent = document.getElementById('recordRent').value;

                newRecord = {
                    id: currentId,
                    apartmentId: leaseApartmentId,
                    tenantId: leaseTenantId,
                    startOfLease: leaseStart,
                    endOfLease: leaseEnd,
                    rent: leaseRent
                };
                break;
            default:
                console.log('switch statement failed');
                return;
        }

        fetch(`/api/${current}/${currentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecord)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Record edited successfully');
                    $('#recordModal').modal('hide');
                    switch (current) {
                        case 'apartment':
                            getApartments();
                            break;
                        case 'owner':
                            getOwners();
                            break;
                        case 'tenant':
                            getTenants();
                            break;
                        case 'lease':
                            getLeaseAgreements();
                            break;
                    }
                } else {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Error editing record');
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessageContainer.innerHTML = error.message;
                errorMessageContainer.style.display = 'block';
            });
    }
}



function editRecord(id) {
    document.getElementById('modalTitle').innerHTML = 'Edit record';
    showAddModal();
    action = 'update';
    currentId = id;
    console.log('started editing...');
}




function deleteRecord(id) {
    $('#deleteModal').modal('show');
    currentId = id;
}

function deletionConfirmed() {

    

    fetch(`/api/${current}/${currentId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Record deleted successfully');
                $('#deleteModal').modal('hide');
            } else {
                console.error('Error adding record');
            }

            switch (current) {
                case 'apartment':
                    getApartments();
                    break;
                case 'owner':
                    getOwners();
                    break;
                case 'tenant':
                    getTenants();
                    break;
                case 'lease':
                    getLeaseAgreements();
                    break;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}