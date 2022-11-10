import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/providers/auth.guard';
import { CreateInvoiceDto } from '../models/create-invoice.dto';
import { InvoiceDto } from '../models/invoice.dto';
import { PatchInvoiceDto } from '../models/patch-invoice.dto';
import { InvoiceService } from '../services/invoice.service';

@Controller('invoice')
@UseGuards(AuthGuard)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}
  @Get()
  getAllinvoices(): InvoiceDto[] {
    return this.invoiceService.getAll();
  }

  @Get(':uuid')
  getinvoiceByUid(@Param('uuid') uuid: string): InvoiceDto {
    return (
      this.invoiceService.getById(uuid) ?? {
        uuid: '',
        userUuid: '',
        detail: { amount: 0, description: '' },
      }
    );
  }

  @Delete(':uuid')
  removeinvoice(@Param('uuid') uuid: string): boolean {
    return this.invoiceService.remove(uuid);
  }

  @Post()
  addNewinvoice(@Body() createinvoiceDto: CreateInvoiceDto): InvoiceDto {
    return this.invoiceService.create(createinvoiceDto);
  }

  @Put(':uuid')
  editExistinginvoice(
    @Param('uuid') uuid: string,
    @Body() invoiceDto: CreateInvoiceDto,
  ): InvoiceDto {
    return this.invoiceService.update(uuid, invoiceDto);
  }

  @Patch(':uuid')
  updateinvoiceInfo(
    @Param('uuid') uuid: string,
    @Body() invoiceDto: PatchInvoiceDto,
  ): InvoiceDto {
    return (
      this.invoiceService.patch(uuid, invoiceDto) ?? {
        uuid: '',
        userUuid: '',
        detail: { amount: 0, description: '' },
      }
    );
  }
}
