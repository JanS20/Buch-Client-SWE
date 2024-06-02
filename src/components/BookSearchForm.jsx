import { Search, Delete, Warning } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  IconButton,
  Divider,
  Rating,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { deDE } from '@mui/x-data-grid/locales';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const BookSearchForm = ({
  searchIsbn,
  setSearchIsbn,
  searchTitel,
  setSearchTitel,
  selectedRatingOption,
  setSelectedRatingOption,
  isJavaScript,
  setIsJavaScript,
  isTypeScript,
  setIsTypeScript,
  selectedBookFormat,
  setselectedBookFormat,
  handleSearch,
  searchError,
  showTable,
  buchDataWithUniqueId,
  navigateToDetails,
  cToken,
  handleDeleteRow,
  handleReset,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Divider></Divider>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="ISBN"
            variant="outlined"
            fullWidth
            value={searchIsbn}
            onChange={(e) => setSearchIsbn(e.target.value)}
            placeholder="z.B. 978-3-16-148410-0"
            style={{ marginBottom: '20px' }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Titel"
            placeholder="Der Titel eines Buches z.B. Alpha"
            variant="outlined"
            fullWidth
            value={searchTitel}
            onChange={(e) => setSearchTitel(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
        <Typography component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            value={selectedRatingOption}
            onChange={(event, newValue) => {
              setSelectedRatingOption(newValue);
            }}
            style={{ marginBottom: '20px' }}
          />
        </Grid>
        <Grid item xs={1} sm={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isTypeScript}
                onChange={(e) => setIsTypeScript(e.target.checked)}
                color="primary"
              />
            }
            label="TypeScript"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isJavaScript}
                onChange={(e) => setIsJavaScript(e.target.checked)}
                color="primary"
              />
            }
            label="JavaScript"
          />
        </Grid>
        <Grid item xs={12}>
          <RadioGroup
            aria-label="Radio options"
            name="radio-options"
            value={selectedBookFormat}
            onChange={(e) => setselectedBookFormat(e.target.value)}
            row
          >
            <FormControlLabel
              value="DRUCKAUSGABE"
              control={<Radio />}
              label="Druckausgabe"
            />
            <FormControlLabel
              value="KINDLE"
              control={<Radio />}
              label="Kindle"
            />
          </RadioGroup>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          style={{ display: 'flex', alignItems: 'center' }}
        >

        </Grid>
        <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Search />}
            onClick={handleSearch}
            style={{ marginRight: '10px', marginBottom: '30px' }}
          >
            Suche
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReset}
            style={{ marginBottom: '30px' }}
          >
            Zurücksetzen
          </Button>
        </Grid>
      </Grid>
      {searchError ? (
        <Typography
          style={{ color: red[500], display: 'flex', alignItems: 'center' }}
        >
          <Warning style={{ marginRight: '5px' }} />
          Keine Bücher gefunden.
        </Typography>
      ) : showTable ? (
        <Box sx={{ height: 371, width: '100%' }}>
          <DataGrid
            localeText={deDE.components.MuiDataGrid.defaultProps.localeText}
            rows={buchDataWithUniqueId}
            getRowId={(row) => row.id}
            onRowClick={navigateToDetails}
            columns={[
              {
                field: 'id',
                headerName: 'ID',
                width: 100,
              },
              {
                field: 'isbn',
                headerName: 'ISBN',
                width: 180,
              },
              {
                field: 'titel',
                headerName: 'Titel',
                renderCell: (params) => params.value?.titel,
                width: 150,
              },
              {
                field: 'rating',
                headerName: 'Rating',
                width: 150,
              },
              {
                field: 'art',
                headerName: 'Art',
                width: 190,
              },
              {
                field: 'schlagwoerter',
                headerName: 'Schlagwörter',
                width: 260,
              },
              {
                field: 'actions',
                headerName: 'Aktionen',
                width: 150,
                renderCell: (params) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton aria-label="search" color="primary">
                      <Search />
                    </IconButton>
                    {cToken && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteRow(params.row.id, cToken);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      ) : null}
    </div>
  );
};

BookSearchForm.propTypes = {
  searchIsbn: PropTypes.string.isRequired,
  setSearchIsbn: PropTypes.func.isRequired,
  searchTitel: PropTypes.string.isRequired,
  setSearchTitel: PropTypes.func.isRequired,
  selectedRatingOption: PropTypes.string.isRequired,
  setSelectedRatingOption: PropTypes.func.isRequired,
  ratingOptions: PropTypes.array.isRequired,
  isJavaScript: PropTypes.bool.isRequired,
  setIsJavaScript: PropTypes.func.isRequired,
  isTypeScript: PropTypes.bool.isRequired,
  setIsTypeScript: PropTypes.func.isRequired,
  selectedBookFormat: PropTypes.string.isRequired,
  setselectedBookFormat: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchError: PropTypes.bool.isRequired,
  showTable: PropTypes.bool.isRequired,
  buchDataWithUniqueId: PropTypes.array.isRequired,
  navigateToDetails: PropTypes.func.isRequired,
  cToken: PropTypes.string,
  handleDeleteRow: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};
export default BookSearchForm;
