// Indian National & Major Holidays
export interface Holiday {
  date: string  // MM-DD format
  name: string
}

const indianHolidays: Holiday[] = [
  { date: '01-01', name: "New Year's Day" },
  { date: '01-26', name: 'Republic Day' },
  { date: '03-08', name: "Maha Shivaratri" },
  { date: '03-14', name: 'Holi' },
  { date: '04-14', name: 'Ambedkar Jayanti' },
  { date: '04-21', name: 'Ram Navami' },
  { date: '05-01', name: 'May Day' },
  { date: '05-23', name: 'Buddha Purnima' },
  { date: '06-17', name: 'Eid ul-Fitr' },
  { date: '07-17', name: 'Muharram' },
  { date: '08-15', name: 'Independence Day' },
  { date: '08-26', name: 'Janmashtami' },
  { date: '09-16', name: 'Milad un-Nabi' },
  { date: '10-02', name: 'Gandhi Jayanti' },
  { date: '10-12', name: 'Dussehra' },
  { date: '10-20', name: 'Karwa Chauth' },
  { date: '10-31', name: 'Diwali' },
  { date: '11-01', name: 'Govardhan Puja' },
  { date: '11-02', name: 'Bhai Dooj' },
  { date: '11-15', name: 'Guru Nanak Jayanti' },
  { date: '12-25', name: 'Christmas' },
]

export function getHoliday(year: number, month: number, day: number): Holiday | null {
  const dateStr = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return indianHolidays.find(h => h.date === dateStr) || null
}
