<?php

namespace App\Exports;

use App\Models\LandbankBilling;
use Maatwebsite\Excel\Concerns\FromCollection;

class LandbankBillingExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return LandbankBilling::all();
    }
}
