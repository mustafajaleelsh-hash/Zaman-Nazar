const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const csvPath = path.join(__dirname, '..', 'supabase', 'products.csv');

const products = require(productsPath);

// Ensure parity with your SQL schema
const headers = ['id', 'name', 'brand', 'category', 'price', 'description', 'features', 'movement', 'material', 'image'];

function escapeCsvField(val) {
    if (val === undefined || val === null) return '';

    // Convert objects/arrays to JSON string representations required by JSONB column
    let str = (typeof val === 'object') ? JSON.stringify(val) : String(val);

    // standard CSV escaping for strings containing quotes, commas, or newlines
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        str = '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}

const csvRows = [];
// Write header row
csvRows.push(headers.join(','));

// Write data rows
for (const p of products) {
    const row = headers.map(h => escapeCsvField(p[h]));
    csvRows.push(row.join(','));
}

fs.writeFileSync(csvPath, csvRows.join('\n'));
console.log('CSV created successfully at: ' + csvPath);
