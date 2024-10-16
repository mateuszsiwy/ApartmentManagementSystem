using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ApartmentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddedSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Owners",
                columns: new[] { "Id", "Email", "Name", "PhoneNumber", "Surname" },
                values: new object[,]
                {
                    { 1, "john.doe@example.com", "John", "123-456-7890", "Doe" },
                    { 2, "jane.smith@example.com", "Jane", "987-654-3210", "Smith" }
                });

            migrationBuilder.InsertData(
                table: "Tenants",
                columns: new[] { "Id", "Email", "Name", "StartOfLease", "Surname" },
                values: new object[,]
                {
                    { 1, "michael.johnson@example.com", "Michael", new DateTime(2023, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Johnson" },
                    { 2, "emily.davis@example.com", "Emily", new DateTime(2023, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Davis" }
                });

            migrationBuilder.InsertData(
                table: "Apartments",
                columns: new[] { "Id", "Address", "Name", "NumberOfRooms", "OwnerId", "Price" },
                values: new object[,]
                {
                    { 1, "123 Sunset Blvd, Cityville", "Sunset Villas", 3, 1, "1200" },
                    { 2, "456 Ocean Drive, Beachtown", "Ocean Breeze Apartments", 2, 2, "1500" }
                });

            migrationBuilder.InsertData(
                table: "LeaseAgreements",
                columns: new[] { "Id", "ApartmentId", "EndOfLease", "Rent", "StartOfLease", "TenantId" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "1200", new DateTime(2023, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 2, 2, new DateTime(2024, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "1500", new DateTime(2023, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "LeaseAgreements",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "LeaseAgreements",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Apartments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Apartments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tenants",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tenants",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Owners",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Owners",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
