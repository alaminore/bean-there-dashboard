// Table sorting functionality
document.addEventListener('DOMContentLoaded', () => {
  const tables = document.querySelectorAll('.data-table');
  
  tables.forEach(table => {
    const headers = table.querySelectorAll('th');
    
    headers.forEach((header, index) => {
      header.style.cursor = 'pointer';
      header.style.userSelect = 'none';
      
      // Add sort indicator
      const sortIcon = document.createElement('span');
      sortIcon.className = 'sort-icon';
      sortIcon.innerHTML = ' ⇅';
      header.appendChild(sortIcon);
      
      header.addEventListener('click', () => {
        sortTable(table, index);
      });
    });
  });
});

function sortTable(table, columnIndex) {
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  
  // Determine sort direction
  const currentDir = table.dataset.sortDir || 'asc';
  const newDir = currentDir === 'asc' ? 'desc' : 'asc';
  table.dataset.sortDir = newDir;
  
  // Sort rows
  rows.sort((a, b) => {
    const aText = a.cells[columnIndex].textContent.trim();
    const bText = b.cells[columnIndex].textContent.trim();
    
    // Try numeric comparison first
    const aNum = parseFloat(aText.replace(/[$,]/g, ''));
    const bNum = parseFloat(bText.replace(/[$,]/g, ''));
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return newDir === 'asc' ? aNum - bNum : bNum - aNum;
    }
    
    // Fallback to string comparison
    return newDir === 'asc' 
      ? aText.localeCompare(bText)
      : bText.localeCompare(aText);
  });
  
  // Update table
  tbody.innerHTML = '';
  rows.forEach(row => tbody.appendChild(row));
  
  // Update sort indicators
  const headers = table.querySelectorAll('th');
  headers.forEach((header, i) => {
    const icon = header.querySelector('.sort-icon');
    if (i === columnIndex) {
      icon.innerHTML = newDir === 'asc' ? ' ▲' : ' ▼';
    } else {
      icon.innerHTML = ' ⇅';
    }
  });
}