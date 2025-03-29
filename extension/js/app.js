document.addEventListener('DOMContentLoaded', () => {
  const setupContainer = document.getElementById('setupContainer');
  const mainContainer = document.getElementById('mainContainer');
  const setupForm = document.getElementById('setupForm');
  const weekGrid = document.getElementById('weekGrid');
  const headerText = document.getElementById('headerText');
  const statsText = document.getElementById('statsText');
  const resetBtn = document.getElementById('resetBtn');

  // Check if user data exists in storage
  browser.storage.local.get(['name', 'dob'])
    .then(result => {
      if (result.name && result.dob) {
        // User already set up, show main view
        setupContainer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        renderWeekGrid(result.name, result.dob);
      } else {
        // First time user, show setup
        setupContainer.classList.remove('hidden');
        mainContainer.classList.add('hidden');
      }
    })
    .catch(error => {
      console.error('Error retrieving data:', error);
    });

  // Handle setup form submission
  setupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    
    // Save user data to storage
    browser.storage.local.set({ name, dob })
      .then(() => {
        setupContainer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        renderWeekGrid(name, dob);
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  });

  // Handle reset button click
  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Clear storage and show setup form
    browser.storage.local.clear()
      .then(() => {
        setupContainer.classList.remove('hidden');
        mainContainer.classList.add('hidden');
      })
      .catch(error => {
        console.error('Error clearing data:', error);
      });
  });

  // Function to render the week grid
  function renderWeekGrid(name, dob) {
    // Clear the grid
    weekGrid.innerHTML = '';
    
    // Calculate weeks data
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const eightyYearsDate = new Date(birthDate);
    eightyYearsDate.setFullYear(birthDate.getFullYear() + 80);
    
    // Calculate total weeks in 80 years (assuming 52 weeks per year)
    const totalWeeks = 80 * 52;
    
    // Calculate weeks lived so far
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksLived = Math.floor((currentDate - birthDate) / msPerWeek);
    const weeksRemaining = totalWeeks - weeksLived;
    
    // Set header text (username is first part of textContent)
    headerText.textContent = `${name}, only ${weeksRemaining} Sundays remain`;
    
    // Set stats text
    statsText.textContent = `You've lived ${weeksLived} weeks. Make the most of your remaining ${weeksRemaining} weeks.`;
    
    // Create grid with years arranged in 4 rows, 20 years per row
    const yearColumns = 20; // 20 years per row
    const yearRows = 4;     // 4 rows total (80 years)
    let currentYear = birthDate.getFullYear();
    let weekCounter = 0;
    
    // Create each row of years
    for (let row = 0; row < yearRows; row++) {
      const yearRow = document.createElement('div');
      yearRow.classList.add('year-row');
      
      // Create the year columns for this row
      for (let col = 0; col < yearColumns; col++) {
        const yearIndex = row * yearColumns + col;
        
        // Only create up to 80 years
        if (yearIndex >= 80) break;
        
        // Create a column for this year
        const yearColumn = document.createElement('div');
        yearColumn.classList.add('year-column');
        
        // Add year label
        const yearLabel = document.createElement('div');
        yearLabel.classList.add('year-label');
        yearLabel.textContent = currentYear;
        yearColumn.appendChild(yearLabel);
        
        // Create container for weeks in this year
        const weeksContainer = document.createElement('div');
        weeksContainer.classList.add('weeks-container');
        
        // Add 52 weeks for the year (in a 4x13 grid)
        for (let week = 0; week < 52; week++) {
          const weekBox = document.createElement('div');
          weekBox.classList.add('week-box');
          
          if (weekCounter < weeksLived) {
            weekBox.classList.add('red');
          } else {
            weekBox.classList.add('green');
          }
          
          weeksContainer.appendChild(weekBox);
          weekCounter++;
        }
        
        // Add weeks container to the year column
        yearColumn.appendChild(weeksContainer);
        
        // Add the year column to the row
        yearRow.appendChild(yearColumn);
        
        currentYear++;
      }
      
      // Add the year row to the grid
      weekGrid.appendChild(yearRow);
    }
  }
}); 