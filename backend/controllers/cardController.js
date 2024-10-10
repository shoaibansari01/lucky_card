import { v4 as uuidv4 } from 'uuid';
import Card from '../models/cardModel.js';
import SelectedCard from '../models/selectedCardModel.js';
import Timer from '../models/timerModel.js';

// Initialize the cards with IDs and amounts
export const initializeCards = async (req, res) => {
    try {
        const cards = [];
        for (let i = 1; i <= 12; i++) {
            cards.push({ cardId: `00${i}`, amount: i + 1 }); // Amount is set as i+1 (i.e., 2, 3, ..., 12)
        }
        await Card.insertMany(cards);
        res.status(201).json({ message: 'Cards initialized', cards });
    } catch (err) {
        res.status(500).json({ message: 'Error initializing cards', error: err.message });
    }
};

// Calculate total amount and find the lowest card
// export const calculateAmounts = async (req, res) => {
//     try {
//         const cards = await Card.find();

//         // Total amount of all cards
//         const totalAmount = cards.reduce((acc, card) => acc + card.amount, 0);

//         // Calculate 85% of totalAmount
//         const percAmount = totalAmount * 0.85;

//         // Calculate amounts for all cards based on the multipliers
//         const amounts = cards.map(card => ({
//             cardId: card.cardId,
//             originalAmount: card.amount,
//             '2X': card.amount * 20,
//             '3X': card.amount * 30,
//             '5X': card.amount * 50,
//         }));

//         // Filter amounts for each multiplier, checking against percAmount
//         const validAmounts = {};

//         // Group valid amounts by multiplier
//         amounts.forEach(item => {
//             if (item['2X'] < percAmount) {
//                 validAmounts[item['2X']] = validAmounts[item['2X']] || [];
//                 validAmounts[item['2X']].push({ ...item, multiplier: '2X', amount: item['2X'] });
//             }
//             if (item['3X'] < percAmount) {
//                 validAmounts[item['3X']] = validAmounts[item['3X']] || [];
//                 validAmounts[item['3X']].push({ ...item, multiplier: '3X', amount: item['3X'] });
//             }
//             if (item['5X'] < percAmount) {
//                 validAmounts[item['5X']] = validAmounts[item['5X']] || [];
//                 validAmounts[item['5X']].push({ ...item, multiplier: '5X', amount: item['5X'] });
//             }
//         });

//         // Flatten valid amounts into an array
//         const flatValidAmounts = Object.values(validAmounts).flat();

//         // Randomly select one valid amount
//         let selectedAmount = null;
//         if (flatValidAmounts.length > 0) {
//             const randomIndex = Math.floor(Math.random() * flatValidAmounts.length);
//             selectedAmount = flatValidAmounts[randomIndex];
//         }

//         // Store the selected card in the database if there's a valid selection
//         if (selectedAmount) {
//             const uniqueId = uuidv4(); // Generate a unique ID for the selected card
//             const selectedCardData = {
//                 id: uniqueId,
//                 cardId: selectedAmount.cardId,
//                 multiplier: selectedAmount.multiplier,
//                 amount: selectedAmount.amount,
//                 originalAmount: selectedAmount.originalAmount,
//             };

//             // Save the selected card data to the database
//             const selectedCard = new SelectedCard(selectedCardData);
//             await selectedCard.save();
//         }

//         // Retrieve all previously selected cards from the database
//         const previousSelectedCards = await SelectedCard.find();

//         res.status(200).json({
//             totalAmount,
//             percAmount,
//             validAmounts: flatValidAmounts, // Return the flattened valid amounts
//             selectedAmount: selectedAmount ? { multiplier: selectedAmount.multiplier, amount: selectedAmount.amount, cardId: selectedAmount.cardId } : null, // Return the selected amount
//             previousSelectedCards, // Return all previous selected cards
//         });
//     } catch (err) {
//         res.status(500).json({ message: 'Error calculating amounts', error: err.message });
//     }
// };

let timerInterval;  // Store the interval globally

// Function to start the timer and check if calculation can start
export const startTimer = async () => {
    let timer = await Timer.findOne({ timerId: 'game-timer' });

    // If no timer is found, create one with 30 seconds remaining
    if (!timer) {
        timer = new Timer({ timerId: 'game-timer', remainingTime: 30, isRunning: true });
        await timer.save();
    }

    timer.isRunning = true;
    await timer.save();

    timerInterval = setInterval(async () => {
        if (timer.remainingTime > 0) {
            timer.remainingTime -= 1;
            await timer.save();
        } else {
            clearInterval(timerInterval);  // Stop the timer when it reaches 0
        }
    }, 1000);
};
// export const startTimer = async (req, res) => {
//     let timer = await Timer.findOne({ timerId: 'game-timer' });

//     // If no timer is found, create one with 30 seconds remaining
//     if (!timer) {
//         timer = new Timer({ timerId: 'game-timer', remainingTime: 30, isRunning: true });
//         await timer.save();
//     }

//     if (timer.isRunning) {
//         return res.status(200).json({ message: 'Timer is already running.' });
//     }

//     timer.isRunning = true;
//     await timer.save();

//     res.status(200).json({ message: 'Timer started with 30 seconds remaining' });

//     // Start the interval but don't block the response
//     timerInterval = setInterval(async () => {
//         if (timer.remainingTime > 0) {
//             timer.remainingTime -= 1;
//             await timer.save();
//         } else {
//             clearInterval(timerInterval);  // Stop the timer when it reaches 0
//             // timer.isRunning = false;
//             // await timer.save();
//         }
//     }, 1000);
// };

export const resetTimer = async () => {
    let timer = await Timer.findOne({ timerId: 'game-timer' });
    if (timer) {
        timer.remainingTime = 30;  // Reset timer to 30 seconds
        await timer.save();
        startTimer();  // Restart the timer
    }
};

export const getTimer = async (req, res) => {
    try {
        const timer = await Timer.findOne({ timerId: 'game-timer' });

        if (!timer) {
            return res.status(404).json({ message: 'No active timer found' });
        }

        res.status(200).json({
            remainingTime: timer.remainingTime,
            isRunning: timer.isRunning
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching timer', error: err.message });
    }
};

// Function to perform the calculation when the timer reaches 10 seconds
export const calculateAmounts = async (req, res) => {
    try {
        let timer = await Timer.findOne({ timerId: 'game-timer' });

        // Wait until the timer reaches 10 seconds
        if (timer.remainingTime > 10 || !timer.isRunning) {
            return res.status(200).json({ message: `Waiting for the timer to reach 10 seconds... Current time: ${timer.remainingTime}` });
        }

        // Stop the timer before starting the calculation
        clearInterval(timerInterval);
        timer.isRunning = false;
        await timer.save();

        // Fetch cards and perform the calculation
        const cards = await Card.find();

        // Total amount of all cards
        const totalAmount = cards.reduce((acc, card) => acc + card.amount, 0);

        // Calculate 85% of totalAmount
        const percAmount = totalAmount * 0.85;

        // Calculate amounts for all cards based on the multipliers
        const amounts = cards.map(card => ({
            cardId: card.cardId,
            originalAmount: card.amount,
            '2X': card.amount * 20,
            '3X': card.amount * 30,
            '5X': card.amount * 50,
        }));

        // Filter amounts for each multiplier, checking against percAmount
        const validAmounts = {};
        amounts.forEach(item => {
            if (item['2X'] < percAmount) {
                validAmounts[item['2X']] = validAmounts[item['2X']] || [];
                validAmounts[item['2X']].push({ ...item, multiplier: '2X', amount: item['2X'] });
            }
            if (item['3X'] < percAmount) {
                validAmounts[item['3X']] = validAmounts[item['3X']] || [];
                validAmounts[item['3X']].push({ ...item, multiplier: '3X', amount: item['3X'] });
            }
            if (item['5X'] < percAmount) {
                validAmounts[item['5X']] = validAmounts[item['5X']] || [];
                validAmounts[item['5X']].push({ ...item, multiplier: '5X', amount: item['5X'] });
            }
        });

        // Flatten valid amounts into an array
        const flatValidAmounts = Object.values(validAmounts).flat();

        // Randomly select one valid amount
        let selectedAmount = null;
        if (flatValidAmounts.length > 0) {
            const randomIndex = Math.floor(Math.random() * flatValidAmounts.length);
            selectedAmount = flatValidAmounts[randomIndex];
        }

        // Store the selected card in the database if there's a valid selection
        if (selectedAmount) {
            const uniqueId = uuidv4(); // Generate a unique ID for the selected card
            const selectedCardData = {
                id: uniqueId,
                cardId: selectedAmount.cardId,
                multiplier: selectedAmount.multiplier,
                amount: selectedAmount.amount,
                originalAmount: selectedAmount.originalAmount,
            };

            const selectedCard = new SelectedCard(selectedCardData);
            await selectedCard.save();
        }

        // Retrieve all previously selected cards from the database
        const previousSelectedCards = await SelectedCard.find();

        // After calculation, reset the timer and start it again
        await resetTimer();

        res.status(200).json({
            totalAmount,
            percAmount,
            validAmounts: flatValidAmounts, // Return the flattened valid amounts
            selectedAmount: selectedAmount ? { multiplier: selectedAmount.multiplier, amount: selectedAmount.amount, cardId: selectedAmount.cardId } : null, // Return the selected amount
            previousSelectedCards, // Return all previous selected cards
        });
    } catch (err) {
        res.status(500).json({ message: 'Error calculating amounts', error: err.message });
    }
};