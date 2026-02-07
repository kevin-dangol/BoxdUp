// let weeklyMeals = {
//     sunday: null,
//     monday: null,
//     tuesday: null,
//     wednesday: null,
//     thursday: null,
//     friday: null
// };

// let currentEditingDay = '';
// let currentMeal = {
//     protein: null,
//     side1: null,
//     side2: null
// };

// function openCustomizer(day) {
//     currentEditingDay = day;
//     document.getElementById('currentDay').textContent = day.charAt(0).toUpperCase() + day.slice(1);
//     document.getElementById('customizerModal').classList.add('active');

//     // Load existing meal if available
//     if (weeklyMeals[day]) {
//         currentMeal = { ...weeklyMeals[day] };
//         // Re-select items in modal (simplified for demo)
//     } else {
//         currentMeal = { protein: null, side1: null, side2: null };
//     }
// }

// function closeCustomizer() {
//     document.getElementById('customizerModal').classList.remove('active');
//     document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('selected'));
// }

// function selectItem(element, category, name, calories, icon) {
//     const section = element.closest('.menu-section');
//     section.querySelectorAll('.menu-item').forEach(item => item.classList.remove('selected'));
//     element.classList.add('selected');

//     currentMeal[category] = { name, calories, icon };
// }

// function saveMeal() {
//     if (!currentMeal.protein || !currentMeal.side1 || !currentMeal.side2) {
//         alert('Please select all items for your meal!');
//         return;
//     }

//     weeklyMeals[currentEditingDay] = { ...currentMeal };
//     updateDayCard(currentEditingDay);
//     updateProgress();
//     closeCustomizer();
// }

// function updateDayCard(day) {
//     const card = document.getElementById(day);
//     const meal = weeklyMeals[day];

//     if (meal) {
//         card.classList.add('completed');
//         const preview = card.querySelector('.meal-preview');
//         preview.classList.add('filled');

//         const totalCals = meal.protein.calories + meal.side1.calories + meal.side2.calories;

//         preview.innerHTML = `
//                     <div class="meal-items">
//                         <span>${meal.protein.icon}</span>
//                         <span>${meal.side1.icon}</span>
//                         <span>${meal.side2.icon}</span>
//                     </div>
//                     <div class="meal-details">
//                         <div class="meal-name">${meal.protein.name}, ${meal.side1.name}, ${meal.side2.name}</div>
//                         <div class="filled-meal-calories">${totalCals} calories total</div>
//                     </div>
//                 `;

//         card.querySelector('.day-status').textContent = '✅';
//     }
// }

// function updateProgress() {
//     const completed = Object.values(weeklyMeals).filter(meal => meal !== null).length;
//     document.getElementById('completedCount').textContent = completed;
//     document.getElementById('progressBar').style.width = (completed / 5 * 100) + '%';
// }

// function applyPresetToAll(preset) {
//     const presets = {
//         balanced: {
//             protein: { name: 'Teriyaki Chicken', calories: 280, icon: '🍗' },
//             side1: { name: 'Edamame', calories: 120, icon: '🫘' },
//             side2: { name: 'Steamed Rice', calories: 150, icon: '🍚' }
//         },
//         protein: {
//             protein: { name: 'Beef Bulgogi', calories: 350, icon: '🥩' },
//             side1: { name: 'Grilled Veggies', calories: 90, icon: '🥬' },
//             side2: { name: 'Quinoa', calories: 120, icon: '🍚' }
//         },
//         veggie: {
//             protein: { name: 'Tofu Katsu', calories: 240, icon: '🧈' },
//             side1: { name: 'Spring Rolls', calories: 180, icon: '🥟' },
//             side2: { name: 'Seaweed Salad', calories: 90, icon: '🥬' }
//         }
//     };

//     const selectedPreset = presets[preset];
//     Object.keys(weeklyMeals).forEach(day => {
//         weeklyMeals[day] = { ...selectedPreset };
//         updateDayCard(day);
//     });
//     updateProgress();
// }

// function randomizeWeek() {
//     const proteins = [
//         { name: 'Teriyaki Chicken', calories: 280, icon: '🍗' },
//         { name: 'Salmon Fillet', calories: 320, icon: '🐟' },
//         { name: 'Beef Bulgogi', calories: 350, icon: '🥩' },
//         { name: 'Tofu Katsu', calories: 240, icon: '🧈' },
//         { name: 'Grilled Shrimp', calories: 180, icon: '🦐' }
//     ];

//     const sides1 = [
//         { name: 'Edamame', calories: 120, icon: '🫘' },
//         { name: 'Spring Rolls', calories: 180, icon: '🥟' },
//         { name: 'Seaweed Salad', calories: 90, icon: '🥬' },
//         { name: 'Gyoza', calories: 200, icon: '🥟' }
//     ];

//     const sides2 = [
//         { name: 'Steamed Rice', calories: 150, icon: '🍚' },
//         { name: 'Fried Rice', calories: 220, icon: '🍛' },
//         { name: 'Pickled Veggies', calories: 40, icon: '🥒' },
//         { name: 'Miso Soup', calories: 60, icon: '🍵' }
//     ];

//     Object.keys(weeklyMeals).forEach(day => {
//         weeklyMeals[day] = {
//             protein: proteins[Math.floor(Math.random() * proteins.length)],
//             side1: sides1[Math.floor(Math.random() * sides1.length)],
//             side2: sides2[Math.floor(Math.random() * sides2.length)]
//         };
//         updateDayCard(day);
//     });
//     updateProgress();
// }

// const mealplanner1 = document.querySelector('.meal-planner-1');
// const mealplanner2 = document.querySelector('.meal-planner-2');
// const mealplanner3 = document.querySelector('.meal-planner-3');

// function proccedto1() {
//     mealplanner1.style.display = 'inline';
//     mealplanner2.style.display = 'none';
//     mealplanner3.style.display = 'none';
// }

// function proccedto2() {
//     const completed = Object.values(weeklyMeals).filter(meal => meal !== null).length;
//     if (completed < 6) {
//         showNotification('Please complete all 6 days before proceeding.', 'error');
//         return;
//     }
//     mealplanner1.style.display = 'none';
//     mealplanner2.style.display = 'inline';
//     mealplanner3.style.display = 'none';
// }

// function proccedto3() {
//     mealplanner1.style.display = 'none';
//     mealplanner2.style.display = 'none';
//     mealplanner3.style.display = 'inline';
// }

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

let weeklyMeals = {
    sunday: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null
};

let currentEditingDay = '';
let currentMeal = {
    protein: null,
    side1: null,
    side2: null
};

// Fetch weekly meal data for the logged-in user
async function fetchWeeklyMeals() {
    const user = supabase.auth.user();
    if (user) {
        const { data, error } = await supabase
            .from('meal_plans')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (error) {
            console.error('Error fetching meals:', error);
        } else {
            if (data) {
                weeklyMeals = data.weekly_meals || weeklyMeals; // Assign fetched meals to `weeklyMeals`
                updateAllDayCards();
            }
        }
    }
}

// Save weekly meals to Supabase
async function saveWeeklyMeals() {
    const user = supabase.auth.user();
    if (user) {
        const { data, error } = await supabase
            .from('meal_plans')
            .upsert({
                user_id: user.id,
                weekly_meals: weeklyMeals
            });

        if (error) {
            console.error('Error saving meals:', error);
        } else {
            console.log('Meals saved successfully');
        }
    }
}

// Load existing meal if available
function openCustomizer(day) {
    currentEditingDay = day;
    document.getElementById('currentDay').textContent = day.charAt(0).toUpperCase() + day.slice(1);
    document.getElementById('customizerModal').classList.add('active');

    // Load existing meal if available
    if (weeklyMeals[day]) {
        currentMeal = { ...weeklyMeals[day] };
    } else {
        currentMeal = { protein: null, side1: null, side2: null };
    }
}

// Close the customizer modal
function closeCustomizer() {
    document.getElementById('customizerModal').classList.remove('active');
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('selected'));
}

// Select a meal item and update current meal
function selectItem(element, category, name, calories, icon) {
    const section = element.closest('.menu-section');
    section.querySelectorAll('.menu-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');

    currentMeal[category] = { name, calories, icon };
}

// Save the selected meal to the current day
function saveMeal() {
    if (!currentMeal.protein || !currentMeal.side1 || !currentMeal.side2) {
        alert('Please select all items for your meal!');
        return;
    }

    weeklyMeals[currentEditingDay] = { ...currentMeal };
    updateDayCard(currentEditingDay);
    updateProgress();
    saveWeeklyMeals(); // Save to Supabase
    closeCustomizer();
}

// Update the meal card for a specific day
function updateDayCard(day) {
    const card = document.getElementById(day);
    const meal = weeklyMeals[day];

    if (meal) {
        card.classList.add('completed');
        const preview = card.querySelector('.meal-preview');
        preview.classList.add('filled');

        const totalCals = meal.protein.calories + meal.side1.calories + meal.side2.calories;

        preview.innerHTML = `
            <div class="meal-items">
                <span>${meal.protein.icon}</span>
                <span>${meal.side1.icon}</span>
                <span>${meal.side2.icon}</span>
            </div>
            <div class="meal-details">
                <div class="meal-name">${meal.protein.name}, ${meal.side1.name}, ${meal.side2.name}</div>
                <div class="filled-meal-calories">${totalCals} calories total</div>
            </div>
        `;
        card.querySelector('.day-status').textContent = '✅';
    }
}

// Update the progress bar and count
function updateProgress() {
    const completed = Object.values(weeklyMeals).filter(meal => meal !== null).length;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('progressBar').style.width = (completed / 5 * 100) + '%';
}

// Update all the day cards
function updateAllDayCards() {
    Object.keys(weeklyMeals).forEach(day => {
        updateDayCard(day);
    });
    updateProgress();
}

// Apply a preset to all days of the week
function applyPresetToAll(preset) {
    const presets = {
        balanced: {
            protein: { name: 'Teriyaki Chicken', calories: 280, icon: '🍗' },
            side1: { name: 'Edamame', calories: 120, icon: '🫘' },
            side2: { name: 'Steamed Rice', calories: 150, icon: '🍚' }
        },
        protein: {
            protein: { name: 'Beef Bulgogi', calories: 350, icon: '🥩' },
            side1: { name: 'Grilled Veggies', calories: 90, icon: '🥬' },
            side2: { name: 'Quinoa', calories: 120, icon: '🍚' }
        },
        veggie: {
            protein: { name: 'Tofu Katsu', calories: 240, icon: '🧈' },
            side1: { name: 'Spring Rolls', calories: 180, icon: '🥟' },
            side2: { name: 'Seaweed Salad', calories: 90, icon: '🥬' }
        }
    };

    const selectedPreset = presets[preset];
    Object.keys(weeklyMeals).forEach(day => {
        weeklyMeals[day] = { ...selectedPreset };
        updateDayCard(day);
    });
    updateProgress();
    saveWeeklyMeals(); // Save to Supabase
}

// Randomize weekly meal plan
function randomizeWeek() {
    const proteins = [
        { name: 'Teriyaki Chicken', calories: 280, icon: '🍗' },
        { name: 'Salmon Fillet', calories: 320, icon: '🐟' },
        { name: 'Beef Bulgogi', calories: 350, icon: '🥩' },
        { name: 'Tofu Katsu', calories: 240, icon: '🧈' },
        { name: 'Grilled Shrimp', calories: 180, icon: '🦐' }
    ];

    const sides1 = [
        { name: 'Edamame', calories: 120, icon: '🫘' },
        { name: 'Spring Rolls', calories: 180, icon: '🥟' },
        { name: 'Seaweed Salad', calories: 90, icon: '🥬' },
        { name: 'Gyoza', calories: 200, icon: '🥟' }
    ];

    const sides2 = [
        { name: 'Steamed Rice', calories: 150, icon: '🍚' },
        { name: 'Fried Rice', calories: 220, icon: '🍛' },
        { name: 'Pickled Veggies', calories: 40, icon: '🥒' },
        { name: 'Miso Soup', calories: 60, icon: '🍵' }
    ];

    Object.keys(weeklyMeals).forEach(day => {
        weeklyMeals[day] = {
            protein: proteins[Math.floor(Math.random() * proteins.length)],
            side1: sides1[Math.floor(Math.random() * sides1.length)],
            side2: sides2[Math.floor(Math.random() * sides2.length)]
        };
        updateDayCard(day);
    });
    updateProgress();
    saveWeeklyMeals(); // Save to Supabase
}

// Switch between the different meal planners
const mealplanner1 = document.querySelector('.meal-planner-1');
const mealplanner2 = document.querySelector('.meal-planner-2');
const mealplanner3 = document.querySelector('.meal-planner-3');

function proccedto1() {
    mealplanner1.style.display = 'inline';
    mealplanner2.style.display = 'none';
    mealplanner3.style.display = 'none';
}

function proccedto2() {
    const completed = Object.values(weeklyMeals).filter(meal => meal !== null).length;
    if (completed < 6) {
        showNotification('Please complete all 6 days before proceeding.', 'error');
        return;
    }
    mealplanner1.style.display = 'none';
    mealplanner2.style.display = 'inline';
    mealplanner3.style.display = 'none';
}

function proccedto3() {
    mealplanner1.style.display = 'none';
    mealplanner2.style.display = 'none';
    mealplanner3.style.display = 'inline';
}

// Fetch meals when the page loads
document.addEventListener('DOMContentLoaded', fetchWeeklyMeals);