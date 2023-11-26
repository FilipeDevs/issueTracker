import { useState, useEffect } from "react";
import Chart from "react-google-charts";

function TicketsPieChart({ title, tickets, filter }) {
    const [pieChartData, setPieChartData] = useState([]);

    // Capitalization function.
    const capitalize = (s) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    useEffect(() => {
        let map = {}; // {ticketType: quantity}

        tickets.forEach((ticket) => {
            const ticketType = capitalize(ticket[filter]);

            if (map[ticketType]) {
                map[ticketType]++;
            } else {
                map[ticketType] = 1;
            }
        });

        setPieChartData(Object.entries(map));
    }, [tickets, filter]);

    return (
        <div>
            <Chart
                chartType="PieChart"
                data={
                    pieChartData.length > 0
                        ? [
                              ["Ticket Type", "Number of Tickets"],
                              ...pieChartData,
                          ]
                        : [["Ticket Type", "Number of Tickets"]]
                }
                options={{ title: title }}
                width={"100%"}
                height={"100px"}
            />
        </div>
    );
}

export default TicketsPieChart;
