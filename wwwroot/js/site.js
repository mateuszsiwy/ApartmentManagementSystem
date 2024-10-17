

document.getElementById('apartmentButton').addEventListener('click', getApartments);

function getApartments() {
    console.log('button clicked');
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