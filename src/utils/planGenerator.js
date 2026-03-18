// Plan Generator Utility
// Generates personalized reading and memorization plans

export const generateRamadanPlan = (goals, startDate, duration = 30) => {
  const plan = {
    reading: [],
    memorization: [],
    weekly: [],
    daily: []
  };

  // Calculate daily reading targets
  const totalReadingPages = goals.totalJuzToRead * 20;
  const dailyReadingPages = Math.ceil(totalReadingPages / duration);
  
  // Calculate daily memorization targets
  const totalMemorizationPages = goals.totalPagesToMemorize;
  const dailyMemorizationPages = Math.ceil(totalMemorizationPages / duration);

  // Generate daily schedule
  for (let day = 1; day <= duration; day++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day - 1);
    
    const dailyPlan = {
      day,
      date: date.toISOString().split('T')[0],
      reading: {
        pages: dailyReadingPages,
        startPage: (day - 1) * dailyReadingPages + 1,
        endPage: Math.min(day * dailyReadingPages, 604)
      },
      memorization: {
        pages: dailyMemorizationPages,
        newPages: Math.ceil(dailyMemorizationPages / 3),
        revisionPages: Math.floor(dailyMemorizationPages * 2 / 3)
      },
      completed: false
    };

    plan.daily.push(dailyPlan);
  }

  // Generate weekly summaries
  for (let week = 1; week <= Math.ceil(duration / 7); week++) {
    const weekStart = (week - 1) * 7 + 1;
    const weekEnd = Math.min(week * 7, duration);
    
    plan.weekly.push({
      week,
      days: plan.daily.slice(weekStart - 1, weekEnd),
      totalReadingPages: dailyReadingPages * (weekEnd - weekStart + 1),
      totalMemorizationPages: dailyMemorizationPages * (weekEnd - weekStart + 1),
      notes: ''
    });
  }

  return plan;
};

export const calculateProgress = (plan, completedDays) => {
  const totalDays = plan.daily.length;
  const completed = completedDays.length;
  const percentage = (completed / totalDays) * 100;
  
  return {
    totalDays,
    completedDays: completed,
    remainingDays: totalDays - completed,
    percentage: Math.round(percentage),
    onTrack: completed >= (new Date().getDate() - new Date(plan.daily[0].date).getDate())
  };
};

export const generateRevisionSchedule = (memorizedPages, currentDay) => {
  // Spaced repetition: Review after 1, 3, 7, 14, 30 days
  const schedule = {
    today: [],
    day1: [],
    day3: [],
    day7: [],
    day14: [],
    day30: []
  };

  memorizedPages.forEach(page => {
    const daysSince = currentDay - page.day;
    
    if (daysSince === 1) schedule.day1.push(page);
    if (daysSince === 3) schedule.day3.push(page);
    if (daysSince === 7) schedule.day7.push(page);
    if (daysSince === 14) schedule.day14.push(page);
    if (daysSince === 30) schedule.day30.push(page);
  });

  schedule.today = [
    ...schedule.day1,
    ...schedule.day3,
    ...schedule.day7,
    ...schedule.day14,
    ...schedule.day30
  ];

  return schedule;
};

export const adjustPlan = (originalPlan, currentDay, completedDays) => {
  const remainingDays = originalPlan.daily.length - currentDay + 1;
  const missedDays = currentDay - 1 - completedDays.length;
  
  if (missedDays <= 0) {
    return { adjusted: false, plan: originalPlan };
  }

  // Recalculate daily targets for remaining days
  const remainingReading = originalPlan.daily
    .slice(currentDay - 1)
    .reduce((sum, day) => sum + day.reading.pages, 0);
  
  const remainingMemorization = originalPlan.daily
    .slice(currentDay - 1)
    .reduce((sum, day) => sum + day.memorization.pages, 0);

  const newDailyReading = Math.ceil(remainingReading / remainingDays);
  const newDailyMemorization = Math.ceil(remainingMemorization / remainingDays);

  return {
    adjusted: true,
    missedDays,
    newDailyReading,
    newDailyMemorization,
    message: `Adjusted plan: ${newDailyReading} pages reading, ${newDailyMemorization} pages memorization per day`
  };
};
