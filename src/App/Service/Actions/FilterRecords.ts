export const filtering = (time: any, service: any, day: any) => {
    if (time + service > 18) {
        return false;
    }

    for (let i = 0; i < day?.records.length; i++) {
        const counter = day.records[i].recordEnd - day.records[i].recordStart;

        for (let j = 0; j < counter; j++) {
            if (
                time < day.records[i].recordEnd &&
                time + service > day.records[i].recordStart
            ) {
                return false;
            }
        }
    }

    return true;
};
