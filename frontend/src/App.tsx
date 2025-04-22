import { useEffect, useState } from "react";
import { AlertDialog, Formular, TimesheetsTable } from "./components";
import {
  createTimesheet,
  deleteTimesheet,
  getTimesheets,
  updateTimesheet,
} from "./services/TimesheetsDataService";
import { Timesheet } from "./lib/entities";
import { Header, MainContent } from "./components/layout";
import { Footer } from "./components/layout/Footer";

const initialTimesheet: Timesheet = {
  id: undefined,
  date: undefined,
  timespan: {
    duration: undefined,
    start: undefined,
    end: undefined,
  },
  user: undefined,
  project: undefined,
};

function App() {
  const [timesheets, setTimesheets] = useState<Timesheet[] | undefined>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState<
    Timesheet | undefined
  >(initialTimesheet);

  const fetchTimesheets = async () => {
    const data = await getTimesheets();

    if (data) {
      setTimesheets(data);
    }
  };

  const saveTimesheet = async (timesheet: Timesheet) => {
    if (timesheet.id) {
      const res = await updateTimesheet(timesheet);

      if (res) {
        console.log("Timesheet updated successfully:", res);
        fetchTimesheets();
      }
    } else {
      const res = await createTimesheet(timesheet);

      if (res) {
        console.log("Timesheet saved successfully:", res);
        fetchTimesheets();
      }
    }
  };

  const removeTimesheet = async (id: number | undefined) => {
    const res = await deleteTimesheet(id);

    if (res) {
      fetchTimesheets();
    }
  };

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const handleClickOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
    setSelectedTimesheet(undefined);
  };

  const editRow = (row: Timesheet) => {
    setSelectedTimesheet(row);
    console.log("row", row);
  };

  const deleteRow = (row: Timesheet) => {
    setSelectedTimesheet(row);
    handleClickOpen();
  };

  return (
    <main className="flex flex-col h-full">
      <Header />
      <MainContent>
        <div className="flex ">
          <Formular
            value={selectedTimesheet ?? initialTimesheet}
            onSave={saveTimesheet}
          />
          <TimesheetsTable
            value={timesheets ?? []}
            onEdit={editRow}
            onDelete={deleteRow}
          />
        </div>
        <AlertDialog
          open={deleteDialogOpen}
          title="Löschvorgang"
          message="Möchten Sie wirklich den Eintrag löschen?"
          onClose={handleClose}
          onConfirm={() => removeTimesheet(selectedTimesheet?.id ?? undefined)}
        />
      </MainContent>
      <Footer />
    </main>
  );
}

export default App;
